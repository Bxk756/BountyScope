import fetch from "node-fetch"

const TIMEOUT = 5000

async function fetchWithMetrics(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT)

  const start = Date.now()

  try {
    const res = await fetch(url, { signal: controller.signal })
    const text = await res.text()
    const time = Date.now() - start

    return { text, time }
  } catch {
    return { text: "", time: TIMEOUT }
  } finally {
    clearTimeout(timeout)
  }
}

function normalize(html) {
  return html
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/\d+/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function similarity(a, b) {
  const A = new Set(normalize(a).split(" "))
  const B = new Set(normalize(b).split(" "))

  const intersection = [...A].filter(x => B.has(x)).length
  const union = new Set([...A, ...B]).size

  return union === 0 ? 0 : intersection / union
}

function buildUrl(baseUrl, param, value) {
  const url = new URL(baseUrl)
  url.searchParams.set(param, value)
  return url.toString()
}

function classify(signals) {
  const vulns = []

  if (signals.find(s => s.type === "BOOLEAN_DIFF")) {
    vulns.push({
      name: "SQL Injection (Boolean-Based)",
      severity: "Critical",
      confidence: 95
    })
  }

  if (signals.find(s => s.type === "SQL_TIME")) {
    vulns.push({
      name: "SQL Injection (Time-Based)",
      severity: "Critical",
      confidence: 90
    })
  }

  if (signals.find(s => s.type === "SQL_ERROR")) {
    vulns.push({
      name: "SQL Injection (Error-Based)",
      severity: "High",
      confidence: 85
    })
  }

  if (signals.length === 0) {
    vulns.push({
      name: "No confirmed vulnerabilities",
      severity: "Info",
      confidence: 0
    })
  }

  return vulns
}

export async function runFuzzAnalysis(baseUrl, params) {

  const results = []

  const sqlErrors = [
    "sql syntax",
    "mysql",
    "warning",
    "pdo",
    "syntax error"
  ]

  for (const param of params) {

    const signals = []
    const seen = new Set()

    // 🔥 BOOLEAN TEST (CORE UPGRADE)
    const truePayload = "1 AND 1=1"
    const falsePayload = "1 AND 1=2"

    const trueRes = await fetchWithMetrics(buildUrl(baseUrl, param, truePayload))
    const falseRes = await fetchWithMetrics(buildUrl(baseUrl, param, falsePayload))

    const boolSim = similarity(trueRes.text, falseRes.text)

    if (boolSim < 0.7 && !seen.has("BOOLEAN_DIFF")) {
      signals.push({
        type: "BOOLEAN_DIFF",
        evidence: `${Math.round(boolSim * 100)}% similarity`
      })
      seen.add("BOOLEAN_DIFF")
    }

    // 🔥 TIME TEST
    const timeRes = await fetchWithMetrics(buildUrl(baseUrl, param, "1 AND SLEEP(2)"))

    if (timeRes.time > 1500 && !seen.has("SQL_TIME")) {
      signals.push({
        type: "SQL_TIME",
        evidence: `Delayed (${timeRes.time}ms)`
      })
      seen.add("SQL_TIME")
    }

    // 🔥 ERROR TEST
    const errorRes = await fetchWithMetrics(buildUrl(baseUrl, param, "'"))

    const lower = errorRes.text.toLowerCase()

    for (const err of sqlErrors) {
      if (lower.includes(err) && !seen.has("SQL_ERROR")) {
        signals.push({
          type: "SQL_ERROR",
          evidence: err
        })
        seen.add("SQL_ERROR")
      }
    }

    results.push({
      parameter: param,
      signals,
      vulnerabilities: classify(signals)
    })
  }

  return results
}

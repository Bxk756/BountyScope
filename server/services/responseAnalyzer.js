/**
 * BountyScope Response Analyzer
 * Detects vulnerability indicators from HTTP responses
 */

export function analyzeResponse(response = {}, payload = "") {

  const signals = []

  const body = response?.snippet || ""

  // =====================
  // Reflected XSS
  // =====================
  if (payload && body.includes(payload)) {
    signals.push({
      type: "Reflected XSS",
      severity: "High",
      confidence: 90,
      evidence: "Payload reflected in response body"
    })
  }

  // =====================
  // SQL Error Detection
  // =====================
  const sqlErrors = [
    "SQL syntax",
    "mysql_fetch",
    "ORA-",
    "SQLite error",
    "syntax error near"
  ]

  sqlErrors.forEach(err => {
    if (body.toLowerCase().includes(err.toLowerCase())) {
      signals.push({
        type: "SQL Injection",
        severity: "Critical",
        confidence: 85,
        evidence: `Database error detected: ${err}`
      })
    }
  })

  // =====================
  // Open Redirect Detection
  // =====================
  if (response?.status >= 300 && response?.status < 400) {
    signals.push({
      type: "Open Redirect",
      severity: "Medium",
      confidence: 80,
      evidence: "Redirect response detected"
    })
  }

  // =====================
  // Auth Bypass Indicator
  // =====================
  if (response?.status === 200 && body.includes("admin")) {
    signals.push({
      type: "Auth Bypass",
      severity: "High",
      confidence: 70,
      evidence: "Privileged content detected"
    })
  }

  return signals
}

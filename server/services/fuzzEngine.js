import { replayRequest } from "./replayEngine.js"

export async function fuzzParameter(request, param) {

  const payloads = [
    "1",
    "9999",
    "' OR 1=1--",
    "<script>alert(1)</script>",
    "../../etc/passwd"
  ]

  const results = []

  for (const payload of payloads) {

    const res = await replayRequest(request, {
      [param]: payload
    })

    results.push({
      payload,
      status: res.status,
      length: res.length
    })

  }

  // ===== ANALYSIS =====
  const signals = []

  const base = results[0]

  results.forEach(r => {

    if (r.status !== base.status) {
      signals.push({
        type: "Status Change",
        evidence: `${base.status} → ${r.status}`
      })
    }

    if (Math.abs(r.length - base.length) > 100) {
      signals.push({
        type: "Response Size Change",
        evidence: `${base.length} → ${r.length}`
      })
    }

  })

  return {
    parameter: param,
    signals,
    tested: results
  }

}

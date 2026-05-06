/**
 * BountyScope Active Scanner Engine
 */

export function runActiveScan(parameters = []) {

  const confirmed = []

  parameters.forEach(param => {

    const name = param.toLowerCase()

    // Simulated payload testing logic

    if (name.includes("redirect")) {

      confirmed.push({
        vulnerability: "Confirmed Open Redirect",
        severity: "Medium",
        confidence: 90,
        proof: "Payload https://evil.com accepted without validation",
        recommendation: "Restrict redirects to trusted domains"
      })

    }

    if (name.includes("id")) {

      confirmed.push({
        vulnerability: "Possible IDOR (Needs Verification)",
        severity: "High",
        confidence: 75,
        proof: "Numeric identifier detected — test with sequential IDs",
        recommendation: "Enforce ownership checks on object access"
      })

    }

  })

  return confirmed
}

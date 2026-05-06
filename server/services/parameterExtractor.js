export function extractParameters(input = "") {

  const params = []

  if (!input) return params

  try {

    // Works for full URL
    if (input.startsWith("http")) {
      const url = new URL(input)
      url.searchParams.forEach((_, key) => {
        params.push(key)
      })
      return params
    }

    // Works for raw HTTP
    const firstLine = input.split("\n")[0]
    const match = firstLine.match(/\?(.*?)\s/)

    if (match) {
      match[1].split("&").forEach(p => {
        const [key] = p.split("=")
        if (key) params.push(key)
      })
    }

  } catch (err) {
    console.error("Extractor error:", err.message)
  }

  return params
}

export async function replayRequest(input, payloadMap = {}) {

  try {

    let url = input

    // Replace params in URL
    Object.entries(payloadMap).forEach(([param, payload]) => {
      const regex = new RegExp(`${param}=[^&]*`, "g")
      url = url.replace(regex, `${param}=${encodeURIComponent(payload)}`)
    })

    const res = await fetch(url)
    const text = await res.text()

    return {
      url,
      status: res.status,
      length: text.length,
      snippet: text.slice(0, 200)
    }

  } catch (err) {

    return {
      error: true,
      message: err.message
    }

  }

}

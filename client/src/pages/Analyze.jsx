import React, { useState } from "react"

export default function Analyze() {

  const [request, setRequest] = useState("")
  const [response, setResponse] = useState("")
  const [results, setResults] = useState([])
  const [payloads, setPayloads] = useState([])

  const analyze = async () => {

    const res = await fetch("http://localhost:5000/api/analyze", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        request,
        response
      })

    })

    const data = await res.json()

    setResults(data.findings)
    setPayloads(data.payloads)

  }

  return (

    <div>

      <h2>HTTP Request Analyzer</h2>

      <textarea
        placeholder="Paste HTTP Request"
        style={{ width: "100%", height: "150px", marginTop: "20px" }}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />

      <textarea
        placeholder="Optional HTTP Response"
        style={{ width: "100%", height: "150px", marginTop: "20px" }}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />

      <button
        onClick={analyze}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Analyze Request
      </button>

      <div style={{ marginTop: "40px" }}>

        {results.map((vuln, i) => (

          <div key={i} style={{
            border: "1px solid #00ff9c",
            padding: "15px",
            marginBottom: "15px"
          }}>

            <h3>{vuln.vulnerability}</h3>
            <p><b>Severity:</b> {vuln.severity}</p>
            <p><b>Confidence:</b> {vuln.confidence}%</p>
            <p>{vuln.explanation}</p>
            <p><b>Remediation:</b> {vuln.remediation}</p>

          </div>

        ))}

      </div>

      <div style={{ marginTop: "40px" }}>

        <h2>Suggested Payloads</h2>

        {payloads.map((p, i) => (

          <div key={i} style={{
            border: "1px solid #00ff9c",
            padding: "15px",
            marginBottom: "15px"
          }}>

            <h3>Parameter: {p.parameter}</h3>

            {Object.entries(p.payloads).map(([type, list]) => (

              <div key={type}>

                <b>{type}</b>

                <ul>

                  {list.map((payload, idx) => (
                    <li key={idx}>{payload}</li>
                  ))}

                </ul>

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>

  )

}

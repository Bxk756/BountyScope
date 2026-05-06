import React, { useState } from "react"

export default function Analyze() {

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const analyze = async () => {

    if (!input) return

    setLoading(true)
    setResults([])

    try {

      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          request: input
        })
      })

      const data = await res.json()

      // 🔥 support BOTH old + new backend formats
      if (data.results) {
        setResults(data.results)
      } else if (data.findings) {
        setResults(data.findings)
      } else {
        setResults([])
      }

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  const getSeverityColor = (severity) => {
    if (!severity) return "#00ff9c"
    if (severity === "Critical") return "#ff3b3b"
    if (severity === "High") return "#ff7a00"
    if (severity === "Medium") return "#ffd000"
    return "#00ff9c"
  }

  return (

    <div style={{
      padding: "30px",
      color: "#00ff9c",
      fontFamily: "monospace"
    }}>

      <h2 style={{ fontSize: "26px" }}>HTTP Analyzer</h2>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL or HTTP request..."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "20px",
          background: "#0d0d0d",
          color: "#00ff9c",
          border: "1px solid #00ff9c",
          padding: "10px"
        }}
      />

      {/* BUTTON */}
      <button
        onClick={analyze}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: loading ? "#333" : "#00ff9c",
          color: "#000",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Scanning..." : "Analyze"}
      </button>

      {/* LOADING */}
      {loading && (
        <div style={{ marginTop: "20px" }}>
          <div className="loader"></div>
          <p>Running fuzz analysis...</p>
        </div>
      )}

      {/* RESULTS */}
      <div style={{ marginTop: "40px" }}>

        {results.map((item, i) => (

          <div key={i} style={{
            border: "1px solid #00ff9c",
            padding: "20px",
            marginBottom: "25px",
            background: "#050505"
          }}>

            {/* PARAM */}
            <h3 style={{ color: "#00ff9c" }}>
              Parameter: {item.parameter}
            </h3>

            {/* VULNERABILITIES */}
            <div style={{ marginTop: "15px" }}>
              <h4>Findings</h4>

              {item.vulnerabilities?.map((v, idx) => (
                <div key={idx} style={{
                  borderLeft: `4px solid ${getSeverityColor(v.severity)}`,
                  padding: "10px",
                  marginTop: "10px",
                  background: "#111"
                }}>
                  <b>{v.name}</b><br />
                  Severity: <span style={{ color: getSeverityColor(v.severity) }}>
                    {v.severity}
                  </span><br />
                  Confidence: {v.confidence}%
                </div>
              ))}
            </div>

            {/* SIGNALS */}
            <div style={{ marginTop: "20px" }}>
              <h4>🔥 Signals</h4>

              {item.signals?.length === 0 && (
                <p>No signals detected</p>
              )}

              {item.signals?.map((s, idx) => (
                <div key={idx} style={{
                  border: "1px solid #ffaa00",
                  padding: "10px",
                  marginTop: "10px",
                  background: "#111"
                }}>
                  <b>{s.type}</b> → {s.evidence}
                </div>
              ))}
            </div>

          </div>

        ))}

      </div>

      {/* STYLE */}
      <style>{`
        .loader {
          border: 4px solid #222;
          border-top: 4px solid #00ff9c;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>

  )
}

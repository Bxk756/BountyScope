import React, { useState } from "react"
import Analyze from "./pages/Analyze.jsx"
import CVSS from "./pages/CVSS.jsx"
import Reports from "./pages/Reports.jsx"

export default function App() {

  const [tab, setTab] = useState("analyze")

  return (

    <div style={{
      padding: "40px",
      background: "black",
      color: "#00ff9c",
      minHeight: "100vh",
      fontFamily: "monospace"
    }}>

      <h1>🛡 BountyScope</h1>
      <p>Security Research Assistant</p>

      <div style={{ marginTop: "20px" }}>

        <button onClick={() => setTab("analyze")}>
          Analyze
        </button>

        <button onClick={() => setTab("cvss")}>
          CVSS
        </button>

        <button onClick={() => setTab("reports")}>
          Reports
        </button>

      </div>

      <div style={{ marginTop: "40px" }}>

        {tab === "analyze" && <Analyze />}
        {tab === "cvss" && <CVSS />}
        {tab === "reports" && <Reports />}

      </div>

    </div>

  )

}

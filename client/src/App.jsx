import React, { useState, useEffect } from "react"

import Analyze from "./pages/Analyze.jsx"
import CVSS from "./pages/CVSS.jsx"
import JWT from "./pages/JWT.jsx"
import Reports from "./pages/Reports.jsx"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

export default function App() {

  const [tab, setTab] = useState("analyze")
  const [authView, setAuthView] = useState("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsLoggedIn(true)
  }, [])

  // 🔐 NOT LOGGED IN → SHOW AUTH
  if (!isLoggedIn) {
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
          <button onClick={() => setAuthView("login")}>Login</button>
          <button onClick={() => setAuthView("register")}>Register</button>
        </div>

        <div style={{ marginTop: "40px" }}>
          {authView === "login" && <Login onLogin={() => setIsLoggedIn(true)} />}
          {authView === "register" && <Register />}
        </div>

      </div>
    )
  }

  // 🔓 LOGGED IN → SHOW YOUR ORIGINAL UI
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

      {/* 🔥 LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token")
          setIsLoggedIn(false)
        }}
        style={{ marginTop: "10px", background: "red", color: "white" }}
      >
        Logout
      </button>

      <div style={{ marginTop: "20px" }}>

        <button onClick={() => setTab("analyze")}>Analyze</button>
        <button onClick={() => setTab("cvss")}>CVSS</button>
        <button onClick={() => setTab("jwt")}>JWT</button>
        <button onClick={() => setTab("reports")}>Reports</button>

      </div>

      <div style={{ marginTop: "40px" }}>

        {tab === "analyze" && <Analyze />}
        {tab === "cvss" && <CVSS />}
        {tab === "jwt" && <JWT />}
        {tab === "reports" && <Reports />}

      </div>

    </div>
  )
}

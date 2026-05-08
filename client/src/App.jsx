import React, { useState, useEffect } from "react"

import Analyze from "./pages/Analyze.jsx"
import CVSS from "./pages/CVSS.jsx"
import JWT from "./pages/JWT.jsx"
import Reports from "./pages/Reports.jsx"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

export default function App() {

  const [tab, setTab] = useState("overview")
  const [authView, setAuthView] = useState("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {
      setIsLoggedIn(true)
    }

  }, [])

  const findings = [
    {
      severity: "CRITICAL",
      title: "SQL Injection",
      target: "/products?id=1",
      time: "2m ago"
    },
    {
      severity: "HIGH",
      title: "BOLA / IDOR",
      target: "/api/user/492",
      time: "5m ago"
    },
    {
      severity: "MEDIUM",
      title: "Information Disclosure",
      target: "/debug/config",
      time: "11m ago"
    },
    {
      severity: "LOW",
      title: "Missing Security Headers",
      target: "/login",
      time: "20m ago"
    }
  ]

  const sidebarItems = [
    "overview",
    "analyze",
    "cvss",
    "jwt",
    "reports",
    "payload lab",
    "replay analysis",
    "ai signals",
    "settings"
  ]

  // 🔐 AUTH SCREEN

  if (!isLoggedIn) {

    return (

      <div style={styles.authPage}>

        <div style={styles.authOverlay}></div>

        <div style={styles.authCard}>

          <h1 style={styles.authLogo}>
            BOUNTYSCOPE
          </h1>

          <p style={styles.authSubtitle}>
            AI-Assisted Offensive Security Platform
          </p>

          <div style={styles.authButtons}>

            <button
              style={styles.authSwitch}
              onClick={() => setAuthView("login")}
            >
              LOGIN
            </button>

            <button
              style={styles.authSwitch}
              onClick={() => setAuthView("register")}
            >
              REGISTER
            </button>

          </div>

          <div style={{ marginTop: "30px" }}>

            {authView === "login" && (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )}

            {authView === "register" && (
              <Register />
            )}

          </div>

        </div>

      </div>

    )

  }

  // 🔓 MAIN DASHBOARD

  return (

    <div style={styles.app}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <div>

          <h1 style={styles.logo}>
            BOUNTYSCOPE
          </h1>

          <p style={styles.logoSubtext}>
            Built for Ethical Hackers
            <br />
            by Swarm Shield LLC
          </p>

        </div>

        <div style={styles.navContainer}>

          {sidebarItems.map((item) => (

            <button
              key={item}
              onClick={() => setTab(item)}
              style={{
                ...styles.navButton,
                background:
                  tab === item
                    ? "rgba(0,153,255,0.16)"
                    : "transparent",
                border:
                  tab === item
                    ? "1px solid #0099ff"
                    : "1px solid transparent"
              }}
            >
              {item.toUpperCase()}
            </button>

          ))}

        </div>

        <div>

          <div style={styles.planCard}>

            <p style={styles.planTitle}>
              HUNTER PLAN
            </p>

            <h2 style={styles.planScans}>
              442 / 500
            </h2>

            <p style={styles.planSubtext}>
              scans remaining
            </p>

          </div>

          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("token")
              setIsLoggedIn(false)
            }}
          >
            LOGOUT
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div style={styles.main}>

        {/* HERO */}

        <div style={styles.hero}>

          <div>

            <h1 style={styles.heroTitle}>
              SEE MORE.
              <br />
              FIND MORE.
              <br />
              PROVE MORE.
            </h1>

            <p style={styles.heroSubtitle}>
              AI-assisted offensive security platform
              for discovering, validating, and analyzing
              modern application vulnerabilities.
            </p>

          </div>

          {/* RADAR */}

          <div style={styles.radarContainer}>

            <div style={styles.radarOuter}></div>
            <div style={styles.radarMiddle}></div>
            <div style={styles.radarInner}></div>

            <div style={styles.radarCenter}>
              BS
            </div>

          </div>

        </div>

        {/* METRICS */}

        <div style={styles.metricsGrid}>

          <div style={styles.metricCard}>
            <p style={styles.metricLabel}>
              TOTAL ASSETS
            </p>
            <h2 style={styles.metricValue}>
              12,834
            </h2>
          </div>

          <div style={styles.metricCard}>
            <p style={styles.metricLabel}>
              ACTIVE SCANS
            </p>
            <h2 style={styles.metricValue}>
              317
            </h2>
          </div>

          <div style={styles.metricCard}>
            <p style={styles.metricLabel}>
              HIGH RISK
            </p>
            <h2 style={styles.metricValue}>
              78
            </h2>
          </div>

          <div style={styles.metricCard}>
            <p style={styles.metricLabel}>
              DISCOVERED APIs
            </p>
            <h2 style={styles.metricValue}>
              1,248
            </h2>
          </div>

        </div>

        {/* DASHBOARD GRID */}

        <div style={styles.dashboardGrid}>

          {/* LEFT PANEL */}

          <div style={styles.panel}>

            <h2 style={styles.panelTitle}>
              LIVE FINDINGS
            </h2>

            {findings.map((finding, index) => (

              <div
                key={index}
                style={styles.findingRow}
              >

                <div>

                  <p
                    style={{
                      ...styles.severity,
                      color:
                        finding.severity === "CRITICAL"
                          ? "#ff3b3b"
                          : finding.severity === "HIGH"
                          ? "#ff9900"
                          : finding.severity === "MEDIUM"
                          ? "#ffe600"
                          : "#00ff99"
                    }}
                  >
                    {finding.severity}
                  </p>

                  <h3 style={styles.findingTitle}>
                    {finding.title}
                  </h3>

                  <p style={styles.findingTarget}>
                    {finding.target}
                  </p>

                </div>

                <p style={styles.findingTime}>
                  {finding.time}
                </p>

              </div>

            ))}

          </div>

          {/* RIGHT PANEL */}

          <div style={styles.panel}>

            <h2 style={styles.panelTitle}>
              AI SIGNALS
            </h2>

            <div style={styles.signalBox}>
              Replay attack chain detected across 3 endpoints.
            </div>

            <div style={styles.signalBox}>
              AI identified probable authorization flaw.
            </div>

            <div style={styles.signalBox}>
              SQL timing anomalies confirmed.
            </div>

            <div style={styles.signalBox}>
              Payload mutation generated elevated response variance.
            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div style={{ marginTop: "30px" }}>

          {tab === "analyze" && <Analyze />}
          {tab === "cvss" && <CVSS />}
          {tab === "jwt" && <JWT />}
          {tab === "reports" && <Reports />}

        </div>

      </div>

    </div>

  )

}

const styles = {

  app: {
    display: "flex",
    background: "#020617",
    color: "white",
    minHeight: "100vh",
    fontFamily: "monospace"
  },

  sidebar: {
    width: "290px",
    background: "#050b18",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  logo: {
    fontSize: "34px",
    letterSpacing: "4px",
    marginBottom: "12px"
  },

  logoSubtext: {
    color: "#4da6ff",
    lineHeight: "24px"
  },

  navContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "40px"
  },

  navButton: {
    padding: "16px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    letterSpacing: "2px"
  },

  planCard: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(0,153,255,0.08)",
    border: "1px solid rgba(0,153,255,0.25)"
  },

  planTitle: {
    color: "#4da6ff",
    marginBottom: "10px"
  },

  planScans: {
    fontSize: "40px"
  },

  planSubtext: {
    color: "#94a3b8"
  },

  logoutButton: {
    width: "100%",
    marginTop: "18px",
    padding: "16px",
    borderRadius: "14px",
    background: "#ff3b3b",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none"
  },

  main: {
    flex: 1,
    padding: "40px"
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px"
  },

  heroTitle: {
    fontSize: "76px",
    lineHeight: "84px",
    marginBottom: "20px"
  },

  heroSubtitle: {
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "32px",
    maxWidth: "700px"
  },

  radarContainer: {
    width: "320px",
    height: "320px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  radarOuter: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    border: "1px solid rgba(0,153,255,0.25)"
  },

  radarMiddle: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    border: "1px solid rgba(0,153,255,0.3)"
  },

  radarInner: {
    position: "absolute",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "2px solid #0099ff"
  },

  radarCenter: {
    fontSize: "58px",
    fontWeight: "bold",
    color: "#0099ff"
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  metricCard: {
    background: "#071224",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.08)"
  },

  metricLabel: {
    color: "#7c93b6",
    marginBottom: "12px",
    letterSpacing: "2px",
    fontSize: "12px"
  },

  metricValue: {
    fontSize: "44px"
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "24px"
  },

  panel: {
    background: "#071224",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.08)"
  },

  panelTitle: {
    fontSize: "28px",
    marginBottom: "24px"
  },

  findingRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },

  severity: {
    letterSpacing: "2px",
    fontSize: "12px"
  },

  findingTitle: {
    marginTop: "8px",
    marginBottom: "4px"
  },

  findingTarget: {
    color: "#94a3b8"
  },

  findingTime: {
    color: "#64748b"
  },

  signalBox: {
    background: "rgba(0,153,255,0.08)",
    border: "1px solid rgba(0,153,255,0.2)",
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "16px",
    lineHeight: "30px",
    color: "#dbeafe"
  },

  authPage: {
    background: "#020617",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "monospace"
  },

  authOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(0,153,255,0.12), transparent 70%)"
  },

  authCard: {
    width: "500px",
    background: "#071224",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "40px",
    position: "relative",
    zIndex: 2,
    color: "white"
  },

  authLogo: {
    fontSize: "42px",
    letterSpacing: "4px",
    marginBottom: "12px"
  },

  authSubtitle: {
    color: "#4da6ff",
    lineHeight: "28px"
  },

  authButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "30px"
  },

  authSwitch: {
    flex: 1,
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(0,153,255,0.25)",
    background: "rgba(0,153,255,0.08)",
    color: "white",
    cursor: "pointer",
    letterSpacing: "2px"
  }

}

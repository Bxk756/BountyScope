export default function Dashboard() {
  const token = localStorage.getItem("token")

  if (!token) {
    window.location.href = "/login"
    return null
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/login"
        }}
      >
        Logout
      </button>
    </div>
  )
}

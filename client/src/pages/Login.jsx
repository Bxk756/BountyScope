import { useState } from "react"
import { loginUser } from "../api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const data = await loginUser(email, password)

    if (data.token) {
      localStorage.setItem("token", data.token)
      alert("Login successful")
      window.location.href = "/dashboard"
    } else {
      alert(data.msg || "Login failed")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

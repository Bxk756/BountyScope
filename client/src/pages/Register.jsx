import { useState } from "react"
import { registerUser } from "../api"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const data = await registerUser(email, password)

    if (data.msg === "User registered") {
      alert("Registered! Now login.")
      window.location.href = "/login"
    } else {
      alert(data.msg || "Error")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {

  const { email, password } = req.body

  try {

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ error: "User exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashed
    })

    res.json({ message: "User created" })

  } catch (err) {
    res.status(500).json({ error: "Register failed" })
  }

})

// LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret123",
      { expiresIn: "7d" }
    )

    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: "Login failed" })
  }

})

export default router

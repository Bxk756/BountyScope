import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import analyzeRoutes from "./routes/analyze.js"
import parameterRoutes from "./routes/parameters.js"
import payloadRoutes from "./routes/payloads.js"
import jsScannerRoutes from "./routes/jsScanner.js"
import authRoutes from "./routes/auth.js"

import connectDB from "./config/db.js"

// 🔥 FIX: FORCE .env LOCATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, ".env") })

// 🔍 DEBUG (leave this for now)
console.log("ENV CHECK:", process.env.MONGO_URI)

const app = express()

// ✅ CONNECT DATABASE
connectDB()

// ✅ MIDDLEWARE
app.use(cors())
app.use(express.json())

// ✅ ROOT
app.get("/", (req, res) => {
  res.json({
    name: "BountyScope API",
    status: "running"
  })
})

// ✅ ROUTES
app.use("/api/analyze", analyzeRoutes)
app.use("/api/parameters", parameterRoutes)
app.use("/api/payloads", payloadRoutes)
app.use("/api/js-scan", jsScannerRoutes)
app.use("/api/auth", authRoutes)

// ✅ START SERVER
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`BountyScope API running on port ${PORT}`)
})

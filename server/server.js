import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"

import analyzeRoute from "./routes/analyze.js"
import reportRoute from "./routes/report.js"

const app = express()

app.use(cors())

app.use(express.json({
  limit: "1mb"
}))

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
})

app.use(limiter)

app.use("/api/analyze", analyzeRoute)
app.use("/api/report", reportRoute)

app.get("/", (req, res) => {
  res.send("BountyScope API running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`BountyScope API running on port ${PORT}`)
})

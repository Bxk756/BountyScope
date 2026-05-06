import express from "express"
import { analyzeRequest } from "../services/vulnerabilityScanner.js"
import { generatePayloads } from "../services/payloadEngine.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/", protect, (req, res) => {

  const request = req.body.request || ""
  const response = req.body.response || ""

  try {

    const result = analyzeRequest(request, response)
    const payloads = generatePayloads(result.parameters)

    res.json({
      findings: result.findings,
      payloads
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Analyzer failed"
    })

  }

})

export default router

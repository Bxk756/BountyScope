import express from "express"
import { analyzeRequest } from "../services/vulnerabilityScanner.js"
import { generatePayloads } from "../services/payloadEngine.js"

const router = express.Router()

router.post("/", (req, res) => {

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

/**
 * BountyScope - Parameter Discovery Route
 */

import express from "express";
import { extractParameters } from "../services/parameterExtractor.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { request } = req.body;

    if (!request) {
      return res.status(400).json({
        error: "Request text is required"
      });
    }

    const parameters = extractParameters(request);

    res.json({
      success: true,
      count: parameters.length,
      parameters
    });

  } catch (err) {
    console.error("Parameter extraction error:", err);

    res.status(500).json({
      error: "Parameter extraction failed"
    });
  }
});

export default router;

/**
 * BountyScope JavaScript Endpoint Scanner Route
 */

import express from "express";
import { scanJS } from "../services/jsEndpointScanner.js";

const router = express.Router();

router.post("/", async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Target URL required"
    });
  }

  const endpoints = await scanJS(url);

  res.json({
    target: url,
    endpoints,
    count: endpoints.length
  });

});

export default router;

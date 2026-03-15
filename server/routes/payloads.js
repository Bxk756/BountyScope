/**
 * BountyScope Payload Route
 */

import express from "express";
import { generatePayloads } from "../services/payloadEngine.js";

const router = express.Router();

router.post("/", (req, res) => {

  const { parameter } = req.body;

  if (!parameter) {
    return res.status(400).json({
      error: "Parameter is required"
    });
  }

  const payloads = generatePayloads(parameter);

  res.json({
    parameter,
    payloads
  });

});

export default router;

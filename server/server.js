import express from "express";
import cors from "cors";

import analyzeRoutes from "./routes/analyze.js";
import parameterRoutes from "./routes/parameters.js";
import payloadRoutes from "./routes/payloads.js";
import jsScannerRoutes from "./routes/jsScanner.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "BountyScope API",
    status: "running"
  });
});

app.use("/api/analyze", analyzeRoutes);
app.use("/api/parameters", parameterRoutes);
app.use("/api/payloads", payloadRoutes);
app.use("/api/js-scan", jsScannerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BountyScope API running on port ${PORT}`);
});

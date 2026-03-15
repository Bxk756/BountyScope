/**
 * BountyScope API Server
 */

import express from "express";
import cors from "cors";

import analyzeRoutes from "./routes/analyze.js";
import reportRoutes from "./routes/report.js";
import parameterRoutes from "./routes/parameters.js";

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
app.use("/api/report", reportRoutes);
app.use("/api/parameters", parameterRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BountyScope API running on port ${PORT}`);
});

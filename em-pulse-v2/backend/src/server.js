import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRouter from "./routes/health.routes.js";
import symptomsRouter from "./routes/symptoms.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/health", healthRouter);
app.use("/api/symptoms", symptomsRouter);

// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ EM-PULSE backend running on http://localhost:${PORT}`);
});

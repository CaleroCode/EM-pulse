import { Router } from "express";
import { getAllSymptoms } from "../controllers/symptoms.controller.js";

const router = Router();

// GET /api/symptoms
router.get("/", getAllSymptoms);

export default router;

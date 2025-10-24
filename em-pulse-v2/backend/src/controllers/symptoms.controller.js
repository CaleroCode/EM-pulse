import { pool } from "../db/pool.js";

export async function getAllSymptoms(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, name, description_patient, description_support
       FROM "Symptom"
       ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching symptoms:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7070", // cambia si tienes otra
  database: "em_pulse"
});

// Ruta GET para obtener testimonios
app.get("/testimonios", (req, res) => {
  connection.query("SELECT * FROM testimonios ORDER BY fecha DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ruta POST para añadir un testimonio
app.post("/testimonios", (req, res) => {
  const { nombre, mensaje } = req.body;
  connection.query(
    "INSERT INTO testimonios (nombre, mensaje) VALUES (?, ?)",
    [nombre, mensaje],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Testimonio guardado" });
    }
  );
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

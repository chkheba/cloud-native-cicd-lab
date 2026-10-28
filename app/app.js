
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Health check HTTP
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Récupérer toutes les tâches
app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY id"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Ajouter une tâche
app.post("/tasks", async (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "A valid title is required"
    });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO tasks (title) VALUES (?)",
      [title.trim()]
    );

    res.status(201).json({
      id: result.insertId,
      title: title.trim(),
      completed: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});


const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Build CI/CD pipeline", completed: false }
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Reussi" });
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

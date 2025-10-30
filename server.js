const express = require("express");
const cors = require("cors");
const tasksRouter = require("./src/routes/tasks.router");
const { getInsights } = require("./src/services/insights.service");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", tasksRouter);

app.get("/insights", (req, res) => {
  getInsights((err, insights) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(insights);
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

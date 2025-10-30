const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../services/tasks.service");

// ✅ Create Task
router.post("/", async (req, res) => {
  try {
    const { title, priority, due_date, status } = req.body;
    if (!title || !priority || !due_date || !status) {
      return res.status(400).json({
        error: "Missing required fields: title, priority, due_date, or status",
      });
    }

    const result = await createTask(req.body);
    res.status(201).json({ message: "Task created successfully", id: result.id });
  } catch (err) {
    console.error("❌ Create task error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✅ Get Tasks (with filters/search/sort)
router.get("/", async (req, res) => {
  try {
    const { status, priority, search, sortBy, order } = req.query;
    const tasks = await getTasks({ status, priority, search, sortBy, order });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Get tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ Update Task (PUT or PATCH)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const result = await updateTask(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found or no changes made" });
    }

    res.json({ message: "Task updated successfully", changes: result.changes });
  } catch (err) {
    console.error("❌ Update task error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ Also support PATCH for flexibility
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const result = await updateTask(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found or no changes made" });
    }

    res.json({ message: "Task updated successfully", changes: result.changes });
  } catch (err) {
    console.error("❌ Update (PATCH) task error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Task ID is required" });

    const result = await deleteTask(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", changes: result.changes });
  } catch (err) {
    console.error("❌ Delete task error:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;

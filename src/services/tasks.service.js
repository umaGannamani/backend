const db = require("../db/database");

/**
 * Create a new task.
 */
function createTask(task) {
  const { title, description = null, priority = "Medium", due_date, status = "Open" } = task;
  const sql = `
    INSERT INTO tasks (title, description, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, [title, description, priority, due_date, status], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

/**
 * Get tasks with optional filters and sorting.
 */
function getTasks({ status, priority, search, sortBy = "due_date", order = "asc" } = {}) {
  let sql = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (priority) {
    sql += " AND priority = ?";
    params.push(priority);
  }

  if (search && search.trim()) {
    sql += " AND (LOWER(title) LIKE LOWER(?) OR LOWER(COALESCE(description, '')) LIKE LOWER(?))";
    const like = `%${search.trim()}%`;
    params.push(like, like);
  }

  const allowedSort = ["due_date", "created_at"];
  const column = allowedSort.includes(sortBy) ? sortBy : "due_date";
  const direction = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
  sql += ` ORDER BY ${column} ${direction}`;

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Update task partially or fully.
 */
function updateTask(id, updates = {}) {
  const fields = [];
  const params = [];

  if (updates.title) {
    fields.push("title = ?");
    params.push(updates.title);
  }
  if (typeof updates.description !== "undefined") {
    fields.push("description = ?");
    params.push(updates.description);
  }
  if (updates.priority) {
    fields.push("priority = ?");
    params.push(updates.priority);
  }
  if (updates.status) {
    fields.push("status = ?");
    params.push(updates.status);
  }
  if (updates.due_date) {
    fields.push("due_date = ?");
    params.push(updates.due_date);
  }

  if (!fields.length) return Promise.resolve({ changes: 0 });

  const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
  params.push(id);

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}

/**
 * Delete a task by ID.
 */
function deleteTask(id) {
  const sql = "DELETE FROM tasks WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

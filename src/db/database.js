const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./task_tracker.db");

// Create tasks table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK(priority IN ('Low','Medium','High')) NOT NULL DEFAULT 'Medium',
      due_date TEXT NOT NULL,
      status TEXT CHECK(status IN ('Open','In Progress','Done')) NOT NULL DEFAULT 'Open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

module.exports = db;

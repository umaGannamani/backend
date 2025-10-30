const db = require("../db/database");

function getInsights(callback) {
  db.serialize(() => {
    const insights = {};

    db.get("SELECT COUNT(*) AS totalOpen FROM tasks WHERE status = 'Open'", [], (err, row1) => {
      if (err) return callback(err);
      insights.totalOpen = row1.totalOpen;

      db.all("SELECT priority, COUNT(*) AS count FROM tasks GROUP BY priority", [], (err, rows2) => {
        if (err) return callback(err);
        insights.priorityDistribution = rows2;

        db.get(
          "SELECT COUNT(*) AS dueSoon FROM tasks WHERE due_date <= date('now', '+3 days') AND status != 'Done'",
          [],
          (err, row3) => {
            if (err) return callback(err);
            insights.dueSoon = row3.dueSoon;

            // Rule-based AI-like summary
            let summary = `You have ${insights.totalOpen} open tasks.`;
            if (insights.dueSoon > 0) summary += ` ${insights.dueSoon} are due soon.`;

            const high = insights.priorityDistribution.find(p => p.priority === "High");
            if (high && high.count > (insights.totalOpen / 2)) {
              summary += " Most of your open tasks are high priority!";
            }

            callback(null, { ...insights, summary });
          }
        );
      });
    });
  });
}

module.exports = { getInsights };

 Task Manager Backend

This is the backend server for the Task Manager App.
It provides RESTful APIs to manage tasks — including creating, reading, updating, and deleting tasks stored in a SQLite database.

🚀 Tech Stack

Node.js – Server runtime

Express.js – Backend framework

SQLite – Lightweight relational database

Cors – To enable frontend-backend communication

Body-parser – For parsing JSON requests

📁 Project Structure
task-manager-backend/
│
├── server.js          # Main entry point for Express server
├── database.js        # SQLite database connection setup
├── routes/
│   └── tasks.js       # Task CRUD API routes
├── models/
│   └── taskModel.js   # Database schema & queries
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend

2️⃣ Install Dependencies
npm install

3️⃣ Run the Server
npm start


or for development mode (auto-restart on changes):

npm run dev


The server will start on:
👉 http://localhost:4000

🗃️ Database Setup

The app uses SQLite (local file-based DB).
When you first run the server, a new file called tasks.db will automatically be created (if it doesn’t exist).

The default schema:

Field	Type	Description
id	INTEGER	Primary key (auto increment)
title	TEXT	Task title
description	TEXT	Task description
status	TEXT	open / in progress / done
priority	TEXT	high / medium / low
dueDate	TEXT	ISO date string
🔗 API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
GET	/tasks/:id	Get task by ID
POST	/tasks	Create new task
PUT	/tasks/:id	Update existing task
DELETE	/tasks/:id	Delete a task
** Example Request
* Add New Task
POST /tasks
Content-Type: application/json

{
  "title": "Build React UI",
  "description": "Implement responsive design",
  "status": "open",
  "priority": "high",
  "dueDate": "2025-11-02"
}

✅ Response
{
  "id": 1,
  "title": "Build React UI",
  "description": "Implement responsive design",
  "status": "open",
  "priority": "high",
  "dueDate": "2025-11-02"
}

* CORS Setup Example

In server.js:

const cors = require("cors");
app.use(cors({ origin: "http://localhost:4000" }));

* Scripts
Command	Description
npm start	Run production server
npm run dev	Run development server using nodemon
* Author

Uma Gannamani
 Full Stack Developer

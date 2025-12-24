const express = require("express");
const app = express();

app.use(express.json());
const PORT = 3000;

// In-memory store
let tasks = [];

// CREATE Task
app.post("/task", (req, res) => {
  const { title, description = "", status = "pending" } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    data: newTask,
  });
});

// READ all Tasks
app.get("/task", (req, res) => {
  res.status(200).json({
    message: "Tasks fetched successfully",
    data: tasks,
  });
});

// READ single Task
app.get("/task/:id", (req, res) => {
  const singleTask = tasks.find((t) => t.id === Number(req.params.id));

  if (!singleTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({
    message: "Task fetched successfully",
    data: singleTask,
  });
});

// UPDATE Task
app.put("/task/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status } = req.body;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(title && { title }),
    ...(description && { description }),
    ...(status && { status }),
  };

  res.status(200).json({
    message: "Task updated successfully",
    data: tasks[taskIndex],
  });
});

// DELETE Task
app.delete("/task/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database file path
const dbPath = path.join(__dirname, 'tasks.json');

// Initialize database
const initializeDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
  }
};

// Read tasks from file
const readTasks = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
};

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

// POST - Create new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const tasks = readTasks();
  
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  writeTasks(tasks);
  
  res.status(201).json(newTask);
});

// PUT - Update task
app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, description, completed } = req.body;
  
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }
  
  const task = tasks[taskIndex];
  task.title = title || task.title;
  task.description = description !== undefined ? description : task.description;
  task.completed = completed !== undefined ? completed : task.completed;
  task.updatedAt = new Date().toISOString();
  
  writeTasks(tasks);
  
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  
  res.json({ message: 'Task deleted', task: deletedTask[0] });
});

// DELETE all completed tasks
app.delete('/api/tasks/completed/all', (req, res) => {
  const tasks = readTasks();
  const completedCount = tasks.filter(t => t.completed).length;
  const filtered = tasks.filter(t => !t.completed);
  
  writeTasks(filtered);
  
  res.json({ message: `${completedCount} completed tasks deleted`, remaining: filtered.length });
});

// Initialize and start server
initializeDB();

app.listen(PORT, () => {
  console.log(`\n🚀 Task Manager API running at http://localhost:${PORT}`);
  console.log(`📝 API Endpoints:`);
  console.log(`   GET    /api/tasks`);
  console.log(`   GET    /api/tasks/:id`);
  console.log(`   POST   /api/tasks`);
  console.log(`   PUT    /api/tasks/:id`);
  console.log(`   DELETE /api/tasks/:id`);
  console.log(`   DELETE /api/tasks/completed/all\n`);
});

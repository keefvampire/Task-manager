// API Base URL
const API_URL = '/api/tasks';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.getElementById('tasksList');
const taskCount = document.getElementById('taskCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// State
let allTasks = [];
let currentFilter = 'all';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

// Setup Event Listeners
const setupEventListeners = () => {
    taskForm.addEventListener('submit', handleAddTask);
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    clearCompletedBtn.addEventListener('click', handleClearCompleted);
};

// Load Tasks from API
const loadTasks = async () => {
    try {
        const response = await fetch(API_URL);
        allTasks = await response.json();
        renderTasks();
        updateTaskCount();
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Error loading tasks', 'error');
    }
};

// Render Tasks
const renderTasks = () => {
    const filteredTasks = filterTasks(allTasks, currentFilter);

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <p>${getEmptyMessage(currentFilter)}</p>
            </div>
        `;
        return;
    }

    tasksList.innerHTML = filteredTasks
        .map(task => createTaskElement(task))
        .join('');

    // Add event listeners to task buttons
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => handleToggleTask(e.target.dataset.id));
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => handleEditTask(e.target.dataset.id));
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => handleDeleteTask(e.target.dataset.id));
    });
};

// Create Task Element HTML
const createTaskElement = (task) => {
    const taskClass = task.completed ? 'completed' : '';
    const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });

    return `
        <div class="task-item ${taskClass}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                data-id="${task.id}"
                ${task.completed ? 'checked' : ''}
            >
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                <small style="color: var(--gray-400);">${createdDate}</small>
            </div>
            <div class="task-actions">
                <button class="task-btn btn-edit" data-id="${task.id}">Edit</button>
                <button class="task-btn btn-delete" data-id="${task.id}">Delete</button>
            </div>
        </div>
    `;
};

// Filter Tasks
const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
};

// Get Empty Message
const getEmptyMessage = (filter) => {
    switch (filter) {
        case 'active':
            return 'No active tasks. You\'re all caught up! 🎉';
        case 'completed':
            return 'No completed tasks yet. Start checking things off! ✅';
        default:
            return 'No tasks yet. Create one to get started!';
    }
};

// Handle Add Task
const handleAddTask = async (e) => {
    e.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (!title) {
        showNotification('Please enter a task title', 'error');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        const newTask = await response.json();
        allTasks.push(newTask);

        taskForm.reset();
        renderTasks();
        updateTaskCount();
        showNotification('Task added successfully! ✅', 'success');
    } catch (error) {
        console.error('Error adding task:', error);
        showNotification('Error adding task', 'error');
    }
};

// Handle Toggle Task
const handleToggleTask = async (taskId) => {
    const task = allTasks.find(t => t.id === parseInt(taskId));
    if (!task) return;

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !task.completed })
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        const updatedTask = await response.json();
        const index = allTasks.findIndex(t => t.id === parseInt(taskId));
        allTasks[index] = updatedTask;

        renderTasks();
        updateTaskCount();
        showNotification(
            updatedTask.completed ? 'Task completed! 🎉' : 'Task marked as active',
            'success'
        );
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Error updating task', 'error');
    }
};

// Handle Edit Task
const handleEditTask = (taskId) => {
    const task = allTasks.find(t => t.id === parseInt(taskId));
    if (!task) return;

    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle === null || newTitle.trim() === '') return;

    const newDescription = prompt('Edit task description:', task.description);

    updateTask(taskId, newTitle.trim(), newDescription?.trim() || '');
};

// Update Task
const updateTask = async (taskId, title, description) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        const updatedTask = await response.json();
        const index = allTasks.findIndex(t => t.id === parseInt(taskId));
        allTasks[index] = updatedTask;

        renderTasks();
        showNotification('Task updated! ✏️', 'success');
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Error updating task', 'error');
    }
};

// Handle Delete Task
const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        allTasks = allTasks.filter(t => t.id !== parseInt(taskId));
        renderTasks();
        updateTaskCount();
        showNotification('Task deleted! 🗑️', 'success');
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Error deleting task', 'error');
    }
};

// Handle Filter Change
const handleFilterChange = (e) => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTasks();
};

// Handle Clear Completed
const handleClearCompleted = async () => {
    const completedCount = allTasks.filter(t => t.completed).length;
    if (completedCount === 0) {
        showNotification('No completed tasks to clear', 'info');
        return;
    }

    if (!confirm(`Delete ${completedCount} completed task(s)?`)) return;

    try {
        const response = await fetch(`${API_URL}/completed/all`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to clear completed tasks');
        }

        allTasks = allTasks.filter(t => !t.completed);
        renderTasks();
        updateTaskCount();
        showNotification(`${completedCount} completed task(s) deleted! 🗑️`, 'success');
    } catch (error) {
        console.error('Error clearing completed tasks:', error);
        showNotification('Error clearing completed tasks', 'error');
    }
};

// Update Task Count
const updateTaskCount = () => {
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;

    let countText = '';
    if (currentFilter === 'all') {
        countText = `${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
    } else if (currentFilter === 'active') {
        countText = `${activeTasks} active task${activeTasks !== 1 ? 's' : ''}`;
    } else if (currentFilter === 'completed') {
        countText = `${completedTasks} completed task${completedTasks !== 1 ? 's' : ''}`;
    }

    taskCount.textContent = countText;

    // Show/hide clear completed button
    clearCompletedBtn.style.display = completedTasks > 0 ? 'block' : 'none';
};

// Show Notification
const showNotification = (message, type = 'info') => {
    // Simple notification - in production, use a toast library
    console.log(`[${type.toUpperCase()}] ${message}`);
};

// Escape HTML to prevent XSS
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
};

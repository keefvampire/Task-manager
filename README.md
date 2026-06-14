# Task Manager API

A modern, full-stack Task Manager application with Express backend and responsive frontend. Manage your daily tasks efficiently with a clean, intuitive interface.

## Features

✨ **Complete CRUD Operations**
- Create, read, update, and delete tasks
- Mark tasks as completed
- Edit task titles and descriptions
- Clear all completed tasks at once

🎨 **Beautiful UI**
- Responsive design that works on mobile and desktop
- Modern gradient design with smooth animations
- Intuitive task filtering (All, Active, Completed)
- Task counter with status information

🚀 **RESTful API**
- Well-structured Express.js backend
- JSON-based persistent storage
- CORS enabled for cross-origin requests
- Comprehensive error handling

📁 **Simple Data Storage**
- No database setup required
- Tasks stored in JSON format
- Automatic persistence

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: JSON file
- **Port**: 3000

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and go to:
```
http://localhost:3000
```

## Usage

### Adding a Task
1. Type your task title in the input field
2. Optionally add a description
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Check the checkbox to mark a task as complete
- **Edit**: Click the Edit button to modify the title or description
- **Delete**: Click the Delete button to remove a task
- **Clear Completed**: Use the "Clear Completed" button to remove all finished tasks

### Filtering Tasks
- **All**: View all tasks
- **Active**: View only incomplete tasks
- **Completed**: View only completed tasks

## API Endpoints

### Get All Tasks
```http
GET /api/tasks
```

### Get Single Task
```http
GET /api/tasks/:id
```

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Learn Node.js",
  "description": "Complete the Express tutorial"
}
```

### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Master REST APIs",
  "completed": true
}
```

### Delete Task
```http
DELETE /api/tasks/:id
```

### Clear All Completed Tasks
```http
DELETE /api/tasks/completed/all
```

## Project Structure

```
task-manager/
├── server.js              # Express API server
├── package.json           # Project dependencies
├── tasks.json             # Task database (auto-generated)
├── public/
│   ├── index.html         # Main HTML template
│   ├── style.css          # Responsive styles
│   └── app.js             # Frontend JavaScript
└── README.md              # This file
```

## Features in Detail

### Backend (server.js)
- Express.js server with REST API
- CORS support
- JSON file-based data persistence
- Input validation
- Error handling with appropriate HTTP status codes
- Automatic ID generation
- Timestamp tracking (createdAt, updatedAt)

### Frontend (public/)
- Single-page application
- Real-time task updates
- Task filtering with visual feedback
- Form validation
- Responsive design
- Smooth animations and transitions
- User-friendly error messages

## Data Structure

Each task object contains:
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "Task description",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Customization

### Styling
Edit `public/style.css` to customize colors, fonts, and layout.

### API Port
Change the `PORT` variable in `server.js` to use a different port.

### Database Location
Modify the `dbPath` in `server.js` to store tasks.json elsewhere.

## Development

### Available Scripts

```bash
# Start the server
npm start

# Start with auto-reload (requires nodemon)
npm install --save-dev nodemon
npx nodemon server.js
```

### Browser DevTools
- Open DevTools (F12) to see API calls in the Network tab
- Console shows any error messages

## Performance Notes

- JSON file I/O is used for simplicity and learning
- For production with many tasks, consider a proper database
- Current implementation is suitable for learning and small projects

## Troubleshooting

**Port 3000 already in use?**
```bash
# Change port in server.js
const PORT = 3001;
```

**Tasks not persisting?**
- Check that `tasks.json` is created in the project root
- Verify write permissions in the directory

**CORS errors?**
- Ensure CORS middleware is enabled in server.js
- Check that requests use correct Content-Type headers

## Future Enhancements

- User authentication
- Database integration (MongoDB, PostgreSQL)
- Task categories and tags
- Due dates and reminders
- Task search functionality
- Dark mode toggle
- Local storage backup
- Export tasks as CSV/PDF

## License

MIT

## Author

Created as a portfolio project demonstrating full-stack web development with Node.js and Vanilla JavaScript.

---

**Happy task managing!** 📋✨

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Task Manager API - Project Guidelines

## Project Overview
A full-stack Task Manager application built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend. Features CRUD operations for tasks with persistent JSON storage.

## Technology Stack
- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: JSON file-based storage
- **Port**: 3000

## Project Structure
```
task-manager/
├── server.js              # Express API server
├── package.json           # Dependencies & scripts
├── tasks.json             # Data storage (auto-generated)
├── public/
│   ├── index.html         # Main HTML page
│   ├── style.css          # Styling
│   └── app.js             # Frontend logic
└── .github/
    └── copilot-instructions.md
```

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete single task
- `DELETE /api/tasks/completed/all` - Clear all completed tasks

## Development Instructions
1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Open browser: http://localhost:3000
4. Modify files in `public/` for frontend changes
5. Modify `server.js` for API changes

## Code Guidelines
- Keep frontend logic in `app.js` organized by functionality
- API responses should include timestamps for audit trails
- All user input must be validated server-side
- HTML content should be escaped to prevent XSS
- Use consistent error handling and user feedback

## Task Tracking
- Each task has: id, title, description, completed status, createdAt, updatedAt
- Tasks persist in `tasks.json` automatically
- No external database required

## Portfolio Highlights
- Full CRUD API implementation
- RESTful endpoint design
- Clean, responsive UI
- Error handling
- Data persistence
- Modern CSS with gradients

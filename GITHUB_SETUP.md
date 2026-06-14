# GitHub repo configuration guide

## Steps to upload to GitHub:

1. **Create a repository on GitHub**
   - Go to https://github.com/new
   - Create a new repository (e.g., "task-manager")
   - Copy the repository URL

2. **Initialize and push from terminal:**
   ```bash
   cd C:\Users\Vampire\task-manager
   git init
   git add .
   git commit -m "Initial commit: Task Manager API with Express and Vanilla JS"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
   git push -u origin main
   ```

3. **Replace:**
   - `YOUR_USERNAME` with your GitHub username
   - The URL with your repository URL

## Files included:
- Express API backend (server.js)
- HTML/CSS/JS frontend (public/)
- Complete CRUD operations
- README.md with documentation
- package.json with dependencies

Ready to push! 🚀

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Task Manager API - Instrucciones del Proyecto

## Información General
Aplicación minimalista de gestión de tareas full-stack. Creada por **Julián Miranda**.

- GitHub: https://github.com/keefvampire/Task-manager
- Demo en vivo: https://keefvampire.github.io/Task-manager/
- Portafolio: https://keefvampire.github.io/portafolio/

## Stack Tecnológico
- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3, JavaScript Vanilla
- Almacenamiento: JSON (sin base de datos)
- Deploy: GitHub Pages + GitHub Actions
- Puerto (desarrollo): 3000

## Estructura del Proyecto
```
task-manager/
├── server.js              # Express API server
├── package.json           # Dependencias & scripts
├── tasks.json             # Base de datos (generada automáticamente)
├── .nojekyll              # Archivo para GitHub Pages
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # Workflow de deploy a GitHub Pages
│   └── copilot-instructions.md
├── public/
│   ├── index.html         # Template HTML
│   ├── style.css          # Estilos minimalistas
│   └── app.js             # Lógica frontend
└── README.md              # Documentación
```

## Características Principales
1. CRUD completo de tareas
2. Persistencia en JSON
3. Filtrado de tareas (Todas, Activas, Completadas)
4. Interfaz minimalista y responsiva
5. Deploy automático a GitHub Pages
6. Metadatos de autor y contacto

## Paleta de Colores
- Primario: #58a6ff (Azul GitHub)
- Peligro: #f85149 (Rojo GitHub)
- Éxito: #3fb950 (Verde GitHub)
- Fondo: #f6f8fa (Blanco frío)
- Texto: #0d1117 (Gris oscuro)

## API Endpoints
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- DELETE /api/tasks/completed/all

## Desarrollo y Deployment

### Local Development
```bash
npm install
npm start
```

### GitHub Pages
El proyecto utiliza GitHub Actions para deploy automático:
- Cada push a `main` dispara el workflow
- Se sirve desde la carpeta `public`
- URL: https://keefvampire.github.io/Task-manager/

## Personalización
- Cambiar autor: Editar footer en `public/index.html`
- Cambiar contacto: Modificar links en `public/index.html`
- Cambiar estilos: Actualizar variables CSS en `public/style.css`

## Guía de Estilo
- Minimalista: Evitar exceso de decoración
- Funcional: Priorizar usabilidad
- Responsivo: Diseño mobile-first
- Formal: Sin emojis innecesarios
- Accesible: Contraste y legibilidad

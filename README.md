# Gestor de Tareas API

Aplicación de Gestor de Tareas completa y moderna con backend Express y frontend responsivo. Administre sus tareas diarias de manera eficiente con una interfaz limpia e intuitiva.

## Características

Operaciones CRUD Completas
- Crear, leer, actualizar y eliminar tareas
- Marcar tareas como completadas
- Editar títulos y descripciones de tareas
- Limpiar todas las tareas completadas simultáneamente

Interfaz de Usuario Moderna
- Diseño responsivo que funciona en dispositivos móviles y escritorio
- Diseño moderno con animaciones suave
- Filtrado intuitivo de tareas (Todas, Activas, Completadas)
- Contador de tareas con información de estado

API RESTful
- Backend Express.js bien estructurado
- Almacenamiento persistente basado en JSON
- CORS habilitado para solicitudes de origen cruzado
- Manejo completo de errores

Almacenamiento de Datos Simple
- Sin necesidad de configurar base de datos
- Tareas almacenadas en formato JSON
- Persistencia automática

## Pila Tecnológica

- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3, JavaScript Vanilla
- Base de Datos: Archivo JSON
- Puerto: 3000

## Inicio Rápido

### Prerrequisitos
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Instalación

1. Navegue al directorio del proyecto:
```bash
cd task-manager
```

2. Instale las dependencias:
```bash
npm install
```

3. Inicie el servidor:
```bash
npm start
```

4. Abra su navegador e ingrese a:
```
http://localhost:3000
```

## Uso

### Agregar una Tarea
1. Escriba el título de su tarea en el campo de entrada
2. Opcionalmente agregue una descripción
3. Haga clic en "Agregar Tarea" o presione Entrar

### Administrar Tareas
- Completar: Active la casilla de verificación para marcar una tarea como completada
- Editar: Haga clic en el botón Editar para modificar el título o descripción
- Eliminar: Haga clic en el botón Eliminar para eliminar una tarea
- Limpiar Completadas: Use el botón "Limpiar Completadas" para eliminar todas las tareas terminadas

### Filtrado de Tareas
- Todas: Ver todas las tareas
- Activas: Ver solo tareas incompletas
- Completadas: Ver solo tareas completadas

## Puntos de Acceso de API

### Obtener Todas las Tareas
```http
GET /api/tasks
```

### Obtener una Tarea Individual
```http
GET /api/tasks/:id
```

### Crear Tarea
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Aprender Node.js",
  "description": "Completar el tutorial de Express"
}
```

### Actualizar Tarea
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Aprender Express.js",
  "description": "Dominar las API REST",
  "completed": true
}
```

### Eliminar Tarea
```http
DELETE /api/tasks/:id
```

### Limpiar Todas las Tareas Completadas
```http
DELETE /api/tasks/completed/all
```

## Estructura del Proyecto

```
task-manager/
├── server.js              # Servidor API Express
├── package.json           # Dependencias del proyecto
├── tasks.json             # Base de datos de tareas (generado automáticamente)
├── public/
│   ├── index.html         # Plantilla HTML principal
│   ├── style.css          # Estilos responsivos
│   └── app.js             # JavaScript del frontend
└── README.md              # Este archivo
```

## Características en Detalle

### Backend (server.js)
- Servidor Express.js con API REST
- Soporte para CORS
- Persistencia de datos basada en archivos JSON
- Validación de entrada
- Manejo de errores con códigos de estado HTTP apropiados
- Generación automática de ID
- Seguimiento de marcas de tiempo (createdAt, updatedAt)

### Frontend (public/)
- Aplicación de página única
- Actualizaciones de tareas en tiempo real
- Filtrado de tareas con retroalimentación visual
- Validación de formularios
- Diseño responsivo
- Animaciones y transiciones suaves
- Mensajes de error amigables

## Estructura de Datos

Cada objeto de tarea contiene:
```json
{
  "id": 1,
  "title": "Tarea de Ejemplo",
  "description": "Descripción de la tarea",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Personalización

### Estilos
Edite `public/style.css` para personalizar colores, fuentes y diseño.

### Puerto de API
Cambie la variable `PORT` en `server.js` para usar un puerto diferente.

### Ubicación de la Base de Datos
Modifique la ruta `dbPath` en `server.js` para almacenar tasks.json en otro lugar.

## Desarrollo

### Scripts Disponibles

```bash
# Iniciar el servidor
npm start

# Iniciar con recarga automática (requiere nodemon)
npm install --save-dev nodemon
npx nodemon server.js
```

### Herramientas de Desarrollo del Navegador
- Abra las Herramientas de Desarrollo (F12) para ver las llamadas a API en la pestaña Red
- La consola muestra cualquier mensaje de error

## Notas de Rendimiento

- La entrada/salida de archivos JSON se utiliza por simplicidad y aprendizaje
- Para producción con muchas tareas, considere una base de datos adecuada
- La implementación actual es adecuada para proyectos de aprendizaje y pequeños

## Solución de Problemas

Puerto 3000 ya está en uso?
```bash
# Cambiar puerto en server.js
const PORT = 3001;
```

Las tareas no persisten?
- Verifique que `tasks.json` se haya creado en la raíz del proyecto
- Verifique los permisos de escritura en el directorio

Errores CORS?
- Asegúrese de que el middleware CORS esté habilitado en server.js
- Verifique que las solicitudes usen encabezados Content-Type correctos

## Mejoras Futuras

- Autenticación de usuario
- Integración de base de datos (MongoDB, PostgreSQL)
- Categorías y etiquetas de tareas
- Fechas de vencimiento y recordatorios
- Funcionalidad de búsqueda de tareas
- Alternancia de modo oscuro
- Copia de seguridad en almacenamiento local
- Exportar tareas como CSV/PDF

## Licencia

MIT

## Autor

Creado como proyecto de portafolio que demuestra desarrollo web full-stack con Node.js y JavaScript Vanilla.

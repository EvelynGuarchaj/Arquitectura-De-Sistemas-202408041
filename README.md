# API de Tareas 

API sencilla desarrollada con Hono, Pino y TypeScript.

## Requisitos previos
- Node.js versión 18 o superior

## Instrucciones de ejecución

1. Instalar las dependencias del proyecto:
   npm install

2. Ejecutar el servidor en modo desarrollo:
   npx tsx index.ts

3. El servidor inicia en http://localhost:5000/api/tareas

## Endpoints disponibles

- GET    /api/tareas Obtiene la lista de tareas 
- POST   /api/tareas Crea una nueva tarea 
- PUT    /api/tareas/:id Actualiza una tarea 
- DELETE /api/tareas/:id Elimina una tarea por ID 

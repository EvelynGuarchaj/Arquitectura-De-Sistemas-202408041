import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { pinoLogger } from 'hono-pino'

interface Tarea {
    id: number
    titulo: string
    estado: string
}

const app = new Hono()

// Logs con pino para registrar cada llamada HTTP
app.use(
    pinoLogger({
      pino: {
        level: 'info',
      },

    })
)

// Base de datos volatil 
let tareas: Tarea[] = [
    { id: 1, titulo: 'Hacer tarea de Arqui', estado: 'pendiente'}
]

// GET codigo validacion
app.get('/api/tareas', (c) =>{ 
  return c.json(tareas,200)
})

//POST codigo creacion
app.post('/api/tareas', async (c) => {
  const nuevaTarea = await c.req.json<Partial<Tarea>>()

  const tareaCreada: Tarea = {
    id: tareas.length + 1,
    titulo: nuevaTarea.titulo || 'Sin titulo',
    estado: nuevaTarea.estado || 'pendiente'
  }
  
  tareas.push(tareaCreada)
  return c.json(tareaCreada, 201)
})

//PUT 
app.put('/api/tareas/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const datosNuevos = await c.req.json<Partial<Tarea>>()

  const tarea = tareas.find((t) => t.id === id)
  if (!tarea){
    return c.json({ error: 'Tarea no encontrada '}, 404)
  }

  tarea.titulo = datosNuevos.titulo ?? tarea.titulo
  tarea.estado = datosNuevos.estado ?? tarea.estado

  return c.json(tarea, 200)
})

// DELETE 
app.delete('/api/tareas/:id', (c) => {
  const id = Number(c.req.param('id'))
  const indice = tareas.findIndex((t) => t.id === id)

  if(indice === -1) {
    return c.json({ error: 'Tarea no encontrada' }, 404)
  }

  tareas.splice(indice, 1)
  return c.json({ mensaje: 'Tarea eliminada'}, 200)
})

serve({
  fetch: app.fetch,
  port: 5000
}, (info) => {
   console.log('Servidor corriendo en http://localhost:5000/api/tareas')
})
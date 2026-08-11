import { serve } from '@hono/node-server'
import { Hono } from 'hono'

interface Libro {
  id: number
  titulo: string
  prestado: boolean 
}

const app = new Hono()

let libros: Libro[] = [
  { id: 1, titulo: 'Arquitectura de software', prestado: false },
  { id: 2, titulo: 'Calculo 1', prestado: true }
]

// Salud 
app.get('/health/fitness', (c) => {
  const totalLibros = libros.length
  const librosPrestados = libros.filter(l => l.prestado).length
  const proporcion = totalLibros === 0 ? 0 : librosPrestados / totalLibros

  const metricas = {
    totalLibros,
    librosPrestados,
    proporcion
  }

  if (totalLibros > 100) {
    return c.json({
      estado: 'Degradacion de Calidad',
      mensaje: 'Limite de capacidad excedido',
      metricas
    }, 503)
  }

  if (proporcion >= 0.8) {
    return c.json({
      estado: 'Degradacion de Calidad',
      mensaje: 'El 80% o mas de los libros estan prestados',
      metricas
    }, 503)
  }

  return c.json({
    estado: 'Healthy',
    metricas
  }, 200)
})

// CRUD PARA LIBROS

app.get('/books', (c) => { 
  return c.json(libros, 200)
})

app.post('/books', async (c) => {
  if (libros.length >= 100) {
    return c.json({ error: 'Capacidad maxima de libros alcanzada' }, 422)
  }

  let nuevoLibro: Partial<Libro>
  
  try {
    nuevoLibro = await c.req.json<Partial<Libro>>()
  } catch (error) {
    return c.json({ error: 'Formato invalido. Se espera un archivo JSON ' }, 400)
  }

  const libroCreado: Libro = {
    id: libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1,
    titulo: nuevoLibro.titulo || 'Sin titulo',
    prestado: nuevoLibro.prestado || false
  }
  
  libros.push(libroCreado)
  return c.json(libroCreado, 201)
})

app.put('/books/:id', async (c) => {
  const id = Number(c.req.param('id'))
  let datosNuevos: Partial<Libro>

  try {
    datosNuevos = await c.req.json<Partial<Libro>>()
  } catch (error) {
    return c.json({ error: 'JSON invalido' }, 400)
  }

  const libro = libros.find((l) => l.id === id)
  if (!libro){
    return c.json({ error: 'Libro no encontrado' }, 404)
  }

  libro.titulo = datosNuevos.titulo ?? libro.titulo
  libro.prestado = datosNuevos.prestado ?? libro.prestado

  return c.json(libro, 200)
})

app.delete('/books/:id', (c) => {
  const id = Number(c.req.param('id'))
  const indice = libros.findIndex((l) => l.id === id)

  if(indice === -1) {
    return c.json({ error: 'Libro no encontrado' }, 404)
  }

  libros.splice(indice, 1)
  return c.json({ mensaje: 'Libro eliminado' }, 200)
})

serve({
  fetch: app.fetch,
  port: 5000
}, (info) => {
   console.log('Servidor corriendo en http://localhost:5000/books')
   console.log('Fitness Function en http://localhost:5000/health/fitness')
})
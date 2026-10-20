import { useEffect, useState } from 'react'
import type { Coleccion, ColeccionId, Diseno } from '@coquette/shared'
import { obtenerColecciones, obtenerDisenos } from './api'
import { FormularioCita } from './components/FormularioCita'>
import { TarjetaDiseno } from './components/TarjetaDiseno'

export default function App() {
  const [disenos, setDisenos] = useState<Diseno[]>([])
  const [colecciones, setColecciones] = useState<Coleccion[]>([])
  const [filtro, setFiltro] = useState<ColeccionId | 'todas'>('todas')
  const [seleccionado, setSeleccionado] = useState<Diseno | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([obtenerDisenos(), obtenerColecciones()])
      .then(([d, c]) => {
        setDisenos(d)
        setColecciones(c)
      })
      .catch(() => setError('No pude conectar con la API. ¿Está corriendo en el puerto 3001?'))
  }, [])

  const visibles = filtro === 'todas' ? disenos : disenos.filter((d) => d.coleccion === filtro)

  return (
    <main>
      <header className="encabezado">
        <h1> Yaniz Studio ♡ </h1>
        <p>Elige tu diseño favorito y reserva tu cita</p>
      </header>

      <nav className="filtros">
        <button className={filtro === 'todas' ? 'activo' : ''} onClick={() => setFiltro('todas')}>Todas</button>
        {colecciones.map((c) => (
          <button key={c.id} className={filtro === c.id ? 'activo' : ''} onClick={() => setFiltro(c.id)}>
            {c.nombre} {c.emoji}
          </button>
        ))}
      </nav>

      {error && <p className="error">{error}</p>}

      <section className="grid">
        {visibles.map((d) => (
          <TarjetaDiseno key={d.id} diseno={d} onReservar={setSeleccionado} />
        ))}
      </section>

      {seleccionado && (
        <div className="fondo-modal">
          <FormularioCita diseno={seleccionado} onCerrar={() => setSeleccionado(null)} />
        </div>
      )}
    </main>
  )
}
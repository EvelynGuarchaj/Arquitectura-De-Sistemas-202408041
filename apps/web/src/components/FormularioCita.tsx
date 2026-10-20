import { useMemo, useState, type FormEvent } from 'react'
import {
  EXTRAS,
  calcularPrecio,
  formatearQuetzales,
  validarCita,
  type Cita,
  type Diseno,
  type ErrorCampo,
  type ExtraId,
  type Largo,
  type SolicitudCita,
} from '@coquette/shared'
import { crearCita } from '../api'

interface Props {
  diseno: Diseno
  onCerrar: () => void
}

export function FormularioCita({ diseno, onCerrar }: Props) {
  const [form, setForm] = useState<SolicitudCita>({
    disenoId: diseno.id,
    nombreCliente: '',
    telefono: '',
    fecha: '',
    hora: '',
    largo: 'corto',
    extras: [],
    cupon: '',
  })
  const [intentoEnviar, setIntentoEnviar] = useState(false)
  const [erroresServidor, setErroresServidor] = useState<ErrorCampo[]>([])
  const [confirmada, setConfirmada] = useState<Cita | null>(null)

  //  Misma logica que usa el backend, desde @coquette/shared
  const precio = useMemo(() => calcularPrecio(diseno, form), [diseno, form])
  const errores = useMemo(() => validarCita(form), [form])

  const errorDe = (campo: keyof SolicitudCita) =>
    intentoEnviar ? errores.find((e) => e.campo === campo)?.mensaje : undefined

  const actualizar = <K extends keyof SolicitudCita>(campo: K, valor: SolicitudCita[K]) =>
    setForm((f) => ({ ...f, [campo]: valor }))

  const alternarExtra = (id: ExtraId) =>
    actualizar('extras', form.extras.includes(id) ? form.extras.filter((e) => e !== id) : [...form.extras, id])

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setIntentoEnviar(true)
    if (errores.length > 0) return
    const resultado = await crearCita(form)
    if (resultado.ok) setConfirmada(resultado.cita)
    else setErroresServidor(resultado.errores)
  }

  if (confirmada) {
    return (
      <div className="panel confirmacion">
        <h2>¡Cita confirmada! 💖</h2>
        <p>
          {confirmada.nombreCliente}, te esperamos el {confirmada.fecha} a las {confirmada.hora} para tu diseño{' '}
          <strong>{diseno.nombre}</strong>.
        </p>
        <p className="total">Total: {formatearQuetzales(confirmada.total)}</p>
        <button onClick={onCerrar}>Volver al catálogo</button>
      </div>
    )
  }

  return (
    <form className="panel" onSubmit={enviar} noValidate>
      <button type="button" className="cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
      <h2>Reservar: {diseno.nombre}</h2>
      

      <label>
        Tu nombre
        <input value={form.nombreCliente} onChange={(e) => actualizar('nombreCliente', e.target.value)} />
        {errorDe('nombreCliente') && <small className="error">{errorDe('nombreCliente')}</small>}
      </label>

      <label>
        Teléfono
        <input value={form.telefono} onChange={(e) => actualizar('telefono', e.target.value)} placeholder="5555-1234" />
        {errorDe('telefono') && <small className="error">{errorDe('telefono')}</small>}
      </label>

      <div className="fila">
        <label>
          Fecha
          <input type="date" value={form.fecha} onChange={(e) => actualizar('fecha', e.target.value)} />
        </label>
        <label>
          Hora
          <input type="time" value={form.hora} onChange={(e) => actualizar('hora', e.target.value)} />
        </label>
      </div>
      {errorDe('fecha') && <small className="error">{errorDe('fecha')}</small>}
      {errorDe('hora') && <small className="error">{errorDe('hora')}</small>}

      <fieldset>
        <legend>Largo</legend>
        {(['corto', 'medio', 'largo'] as Largo[]).map((l) => (
          <label key={l} className="opcion">
            <input type="radio" name="largo" checked={form.largo === l} onChange={() => actualizar('largo', l)} /> {l}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        {Object.values(EXTRAS).map((extra) => (
          <label key={extra.id} className="opcion">
            <input type="checkbox" checked={form.extras.includes(extra.id)} onChange={() => alternarExtra(extra.id)} />{' '}
            {extra.nombre} (+{formatearQuetzales(extra.precio)})
          </label>
        ))}
      </fieldset>

      <label>
        Cupón
        <input value={form.cupon} onChange={(e) => actualizar('cupon', e.target.value)} placeholder="COQUETTE10" />
      </label>

      <div className="resumen">
        <span>Subtotal: {formatearQuetzales(precio.subtotal)}</span>
        {precio.descuento > 0 && <span>Descuento: −{formatearQuetzales(precio.descuento)}</span>}
        <strong className="total">Total: {formatearQuetzales(precio.total)}</strong>
        <small>calculado con @coquette/shared</small>
      </div>

      {erroresServidor.map((e) => (
        <small key={e.campo + e.mensaje} className="error">Servidor: {e.mensaje}</small>
      ))}

      <button type="submit">Confirmar cita</button>
    </form>
  )
}
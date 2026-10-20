import type { Cita, Coleccion, Diseno, ErrorCampo, SolicitudCita } from
    '@coquette/shared'
export async function obtenerDisenos(): Promise<Diseno[]> {
    const res = await fetch('/api/disenos')
    if (!res.ok) throw new Error('No se pudo cargar el catálogo')
    return res.json()
}
export async function obtenerColecciones(): Promise<Coleccion[]> {
    const res = await fetch('/api/colecciones')
    if (!res.ok) throw new Error('No se pudieron cargar las colecciones')
    return res.json()
}
export async function crearCita(
    solicitud: SolicitudCita,
): Promise<{ ok: true; cita: Cita } | { ok: false; errores: ErrorCampo[] }> {
    const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitud),
    })
    const datos = await res.json()
    return res.ok ? { ok: true, cita: datos } : {
        ok: false, errores:
            datos.errores
    }
}
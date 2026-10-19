import { HORARIO } from "./catalogo.js";
import type { ErrorCampo, SolicitudCita } from "./tipos.js";

export function validarCita(cita: SolicitudCita, ahora: Date = new Date()): ErrorCampo[] {
  const errores: ErrorCampo[] = [];

  // Diseño
  if (!cita.disenoId) {
    errores.push({ campo: "disenoId", mensaje: "Elige un diseño." });
  }

  // Nombre
  if (cita.nombreCliente.trim().length < 3) {
    errores.push({ campo: "nombreCliente", mensaje: "Escribe tu nombre (mínimo 3 letras)." });
  }

  // Telefono (quitando espacios y guiones)
  const soloDigitos = cita.telefono.replace(/[\s-]/g, "");
  if (!/^\d{8}$/.test(soloDigitos)) {
    errores.push({ campo: "telefono", mensaje: "El teléfono debe tener 8 dígitos." });
  }

  // Fecha y hora vacias
  if (!cita.fecha || !cita.hora) {
    errores.push({ campo: "fecha", mensaje: "Elige fecha y hora." });
    return errores;
  }

  // Fecha y hora juntas
  const fechaHora = new Date(`${cita.fecha}T${cita.hora}`);
  if (Number.isNaN(fechaHora.getTime())) {
    errores.push({ campo: "fecha", mensaje: "La fecha u hora no es válida." });
    return errores;
  }

  // Fecha futura
  if (fechaHora <= ahora) {
    errores.push({ campo: "fecha", mensaje: "La cita debe ser en una fecha futura." });
  }

  // Domingo (0 = domingo)
  if (fechaHora.getDay() === 0) {
    errores.push({ campo: "fecha", mensaje: "Los domingos el estudio está cerrado." });
  }

  // Horario de 9:00 a 17:00
  const minutos = fechaHora.getHours() * 60 + fechaHora.getMinutes();
  if (minutos < HORARIO.abre * 60 || minutos > HORARIO.ultimaCita * 60) {
    errores.push({ campo: "hora", mensaje: "Atendemos de 9:00 a 17:00 (hora de la última cita)." });
  }

  return errores;
}
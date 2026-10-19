import { describe, expect, it } from "vitest";
import { validarCita } from "./citas.js";
import type { SolicitudCita } from "./tipos.js";
const AHORA = new Date("2026-10-17T10:00");
const citaValida: SolicitudCita = {
    disenoId: "spooky-coquette",
    nombreCliente: "Evelyn",
    telefono: "5555-1234",
    fecha: "2026-10-20", // martes
    hora: "10:30",
    largo: "medio",
    extras: [],
};
const campos = (cita: SolicitudCita) => validarCita(cita, AHORA).map((e) =>
    e.campo);
describe("validarCita", () => {
    it("acepta una cita correcta", () => {
        expect(validarCita(citaValida, AHORA)).toEqual([]);
    });
    it("pide un nombre de al menos 3 letras", () => {
        expect(campos({
            ...citaValida, nombreCliente: " Ev "
        })).toContain("nombreCliente");
    });
    it("pide un teléfono de 8 dígitos", () => {
        expect(campos({ ...citaValida, telefono: "1234" })).toContain("telefono");
    });
    it("rechaza fechas pasadas", () => {
        expect(campos({ ...citaValida, fecha: "2026-10-16" })).toContain("fecha");
    });
    it("rechaza los domingos", () => {
        const errores = validarCita({ ...citaValida, fecha: "2026-10-18" },
            AHORA);
        expect(errores).toContainEqual({
            campo: "fecha",
            mensaje: "Los domingos el estudio está cerrado.",
        });
    });
    it("rechaza horas fuera del horario", () => {
        expect(campos({ ...citaValida, hora: "08:00" })).toContain("hora");
        expect(campos({ ...citaValida, hora: "17:30" })).toContain("hora");
        expect(campos({ ...citaValida, hora: "17:00" })).not.toContain("hora");
    });
});
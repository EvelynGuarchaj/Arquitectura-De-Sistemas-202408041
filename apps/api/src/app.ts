import path from "node:path";
import express from "express";
import {
  COLECCIONES,
  calcularPrecio,
  validarCita,
  type Cita,
  type SolicitudCita,
} from "@coquette/shared";
import { disenos } from "./data/disenos.js";

export const app = express();

app.use(express.json());

// Fotos: /api/imagenes/spooky-coquette.jpeg → public/disenos/spooky-coquette.jpeg
app.use("/api/imagenes", express.static(path.join(import.meta.dirname, "../public/disenos")));

// Citas guardadas en memoria (se borran al reiniciar)
const citas: Cita[] = [];

app.get("/api/salud", (_req, res) => {
  res.json({ ok: true, mensaje: "Coquette Nails API 💅" });
});

app.get("/api/colecciones", (_req, res) => {
  res.json(Object.values(COLECCIONES));
});

// Todos los diseños, o filtrados con ?coleccion=cherry
app.get("/api/disenos", (req, res) => {
  const { coleccion } = req.query;
  const lista =
    typeof coleccion === "string" ? disenos.filter((d) => d.coleccion === coleccion) : disenos;
  res.json(lista);
});

// Un diseño por id
app.get("/api/disenos/:id", (req, res) => {
  const diseno = disenos.find((d) => d.id === req.params.id);
  if (!diseno) {
    res.status(404).json({ error: "Diseño no encontrado" });
    return;
  }
  res.json(diseno);
});

// Crear una cita: valida y calcula el total con @coquette/shared
app.post("/api/citas", (req, res) => {
  const solicitud = req.body as SolicitudCita;
  const errores = validarCita(solicitud);

  const diseno = disenos.find((d) => d.id === solicitud.disenoId);
  if (!diseno) {
    errores.push({ campo: "disenoId", mensaje: "Ese diseño no existe." });
  }

  if (errores.length > 0 || !diseno) {
    res.status(400).json({ errores });
    return;
  }

  const { total } = calcularPrecio(diseno, solicitud);
  const cita: Cita = {
    ...solicitud,
    id: citas.length + 1,
    total,
    creadaEn: new Date().toISOString(),
  };
  citas.push(cita);
  res.status(201).json(cita);
});

// Lista de citas
app.get("/api/citas", (_req, res) => {
  res.json(citas);
});
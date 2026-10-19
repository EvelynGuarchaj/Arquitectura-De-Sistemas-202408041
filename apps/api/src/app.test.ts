import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("API Coquette Nails", () => {
  it("GET salud responde ok", async () => {
    const res = await request(app).get("/api/salud");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("GET disenos filtra por coleccion", async () => {
    const res = await request(app).get("/api/disenos?coleccion=cherry");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    for (const d of res.body) {
      expect(d.coleccion).toBe("cherry");
    }
  });

  it("POST citas rechaza datos invalidos", async () => {
    const res = await request(app).post("/api/citas").send({
      disenoId: "spooky-coquette",
      nombreCliente: "Ev",
      telefono: "123",
      fecha: "2020-01-01",
      hora: "10:00",
      largo: "corto",
      extras: [],
    });
    expect(res.status).toBe(400);
    expect(res.body.errores).toContainEqual({
      campo: "telefono",
      mensaje: "El teléfono debe tener 8 dígitos.",
    });
  });

  it("POST citas calcula el total", async () => {
    const res = await request(app).post("/api/citas").send({
      disenoId: "spooky-coquette",
      nombreCliente: "Evelyn",
      telefono: "55551234",
      fecha: "2099-10-20",
      hora: "10:30",
      largo: "largo",
      extras: ["cromado"],
      cupon: "COQUETTE10",
    });
    expect(res.status).toBe(201);
    expect(res.body.total).toBe(229.5);
  });
});
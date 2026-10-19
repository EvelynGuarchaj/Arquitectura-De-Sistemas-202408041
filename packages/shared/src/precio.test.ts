import { describe, expect, it } from "vitest";
import { calcularPrecio, formatearQuetzales } from "./precio.js";
const diseno = { precioBase: 150 };
describe("calcularPrecio", () => {
    it("cobra solo el precio base para uñas cortas sin extras", () => {
        expect(calcularPrecio(diseno, { largo: "corto", extras: [] })).toEqual({
            subtotal: 150,
            descuento: 0,
            total: 150,
        });
    });
    it("suma el largo y los extras", () => {
        const r = calcularPrecio(diseno, {
            largo: "largo", extras: ["cromado",
                "pedreria"]
        });
        expect(r.total).toBe(245); // 150 + 40 + 30 + 25
    });
    it("no cobra dos veces el mismo extra", () => {
        const r = calcularPrecio(diseno, {
            largo: "corto", extras: ["cromado",
                "cromado"]
        });
        expect(r.total).toBe(180);
    });
    it("aplica el cupón aunque venga en minúsculas o con espacios", () => {
        const r = calcularPrecio(diseno, {
            largo: "largo",
            extras: ["cromado", "pedreria"],
            cupon: " coquette10 ",
        });
        expect(r).toEqual({ subtotal: 245, descuento: 24.5, total: 220.5 });
    });
    it("ignora cupones que no existen", () => {
        const r = calcularPrecio(diseno, {
            largo: "medio", extras: [], cupon:
                "GRATIS100"
        });
        expect(r.descuento).toBe(0);
        expect(r.total).toBe(170);
    });
});
describe("formatearQuetzales", () => {
    it("usa Q y dos decimales", () => {
        expect(formatearQuetzales(185)).toBe("Q185.00");
        expect(formatearQuetzales(220.5)).toBe("Q220.50");
    });
    it("separa los miles con coma", () => {
        expect(formatearQuetzales(1250.5)).toBe("Q1,250.50");
    });
});
import { CUPONES, EXTRAS, PRECIO_POR_LARGO } from "./catalogo.js";
import type { Diseno, OpcionesPrecio, ResultadoPrecio } from "./tipos.js";

// Redondea a 2 decimales
const redondear = (n: number) => Math.round(n * 100) / 100;

export function calcularPrecio(
  diseno: Pick<Diseno, "precioBase">,
  opciones: OpcionesPrecio,
): ResultadoPrecio {
  // 1. Quitar extras repetidos
  const extrasUnicos = [...new Set(opciones.extras)];

  // 2. Sumar el precio de los extras
  const totalExtras = extrasUnicos.reduce((suma, id) => suma + EXTRAS[id].precio, 0);

  // 3. Subtotal
  const subtotal = diseno.precioBase + PRECIO_POR_LARGO[opciones.largo] + totalExtras;

  // 4. Cupón (sin espacios y en mayúsculas)
  const codigo = opciones.cupon?.trim().toUpperCase() ?? "";
  const porcentaje = CUPONES[codigo] ?? 0;

  // 5. Descuento y total
  const descuento = redondear(subtotal * porcentaje);
  const total = redondear(subtotal - descuento);

  return { subtotal, descuento, total };
}

export function formatearQuetzales(monto: number): string {
  const numero = monto.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Q${numero}`;
}
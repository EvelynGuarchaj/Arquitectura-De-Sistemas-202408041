import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Diseno } from "@coquette/shared";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TarjetaDiseno } from "./TarjetaDiseno";
const diseno: Diseno = {
  id: "spooky-coquette",
  nombre: "Spooky Coquette",
  coleccion: "spooky",
  precioBase: 185,
  descripcion: "Fantasmita, telaraña y moño rosa.",
  imagen: "/api/imagenes/spooky-coquette.jpeg",
};
afterEach(cleanup);
describe("TarjetaDiseno", () => {
  it("muestra el precio formateado por @coquette/shared", () => {
    render(<TarjetaDiseno diseno={diseno} onReservar={() => {}} />);
    expect(screen.getByText("Q185.00")).toBeTruthy();
  });
  it("avisa cuando se presiona Reservar", () => {
    const onReservar = vi.fn();
    render(<TarjetaDiseno diseno={diseno} onReservar={onReservar} />);
    fireEvent.click(screen.getByRole("button", { name: /reservar/i }));
    expect(onReservar).toHaveBeenCalledWith(diseno);
  });
});

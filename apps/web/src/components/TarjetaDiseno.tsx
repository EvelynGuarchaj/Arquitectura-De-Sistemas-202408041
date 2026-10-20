import { COLECCIONES, formatearQuetzales, type Diseno } from "@coquette/shared";
interface Props {
  diseno: Diseno;
  onReservar: (diseno: Diseno) => void;
}
export function TarjetaDiseno({ diseno, onReservar }: Props) {
  const coleccion = COLECCIONES[diseno.coleccion];
  return (
    <article className="tarjeta">
      <img src={diseno.imagen} alt={diseno.nombre} loading="lazy" />
      <div className="tarjeta-cuerpo">
        <span className="etiqueta">
          {coleccion.nombre} {coleccion.emoji}
        </span>
        <h3>{diseno.nombre}</h3>
        <p>{diseno.descripcion}</p>
        <div className="tarjeta-pie">
          <strong>{formatearQuetzales(diseno.precioBase)}</strong>
          <button onClick={() => onReservar(diseno)}>Reservar</button>
        </div>
      </div>
    </article>
  );
}

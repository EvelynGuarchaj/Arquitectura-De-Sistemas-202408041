export type ColeccionId =
    | "otono"
    | "spooky"
    | "gotica"
    | "cherry"
    | "botanica"
    | "pastel"
    | "caramelo"
    | "sirena";
export type Largo = "corto" | "medio" | "largo";
export type ExtraId = "retiro" | "cromado" | "pedreria" | "ojo-de-gato" |
    "reparacion";
export interface Coleccion {
    id: ColeccionId;
    nombre: string;
    emoji: string;
}
export interface Extra {
    id: ExtraId;
    nombre: string;
    precio: number;
}
export interface Diseno {
    id: string;
    nombre: string;
    coleccion: ColeccionId;
    precioBase: number;
    descripcion: string;
    imagen: string;
}
export interface OpcionesPrecio {
    largo: Largo;
    extras: ExtraId[];
    cupon?: string;
}
export interface ResultadoPrecio {
    subtotal: number;
    descuento: number;
    total: number;
}
export interface SolicitudCita {
    disenoId: string;
    nombreCliente: string;
    telefono: string;
    fecha: string; // "2026-10-20"
    hora: string; // "10:30"
    largo: Largo;
    extras: ExtraId[];
    cupon?: string;
}
export interface Cita extends SolicitudCita {
    id: number;
    total: number;
    creadaEn: string;
}
export interface ErrorCampo {
    campo: keyof SolicitudCita;
    mensaje: string;
}
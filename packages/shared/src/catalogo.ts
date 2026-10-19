import type { Coleccion, ColeccionId, Extra, ExtraId, Largo } from
    "./tipos.js";
export const COLECCIONES: Record<ColeccionId, Coleccion> = {

    otono: { id: "otono", nombre: "Otoño Carey", emoji: "🍂" },
    spooky: { id: "spooky", nombre: "Spooky Coquette", emoji: "🔮" },
    gotica: { id: "gotica", nombre: "Noche Gótica", emoji: "🖤" },
    cherry: { id: "cherry", nombre: "Cherry Coquette", emoji: "🍒" },
    botanica: { id: "botanica", nombre: "Botánica Salvia", emoji: "🌿" },
    pastel: { id: "pastel", nombre: "Pastel Floral", emoji: "🌼" },
    caramelo: { id: "caramelo", nombre: "Caramelo Dorado", emoji: "🤎" },
    sirena: { id: "sirena", nombre: "Aura Sirena", emoji: "🧜‍♀️" },
};

export const PRECIO_POR_LARGO: Record<Largo, number> = {
    corto: 0,
    medio: 20,
    largo: 40,
};
export const EXTRAS: Record<ExtraId, Extra> = {
    retiro: { id: "retiro", nombre: "Retiro de gel anterior", precio: 40 },
    cromado: { id: "cromado", nombre: "Efecto cromado", precio: 30 },
    pedreria: { id: "pedreria", nombre: "Pedrería extra", precio: 25 },
    "ojo-de-gato": {
        id: "ojo-de-gato", nombre: "Efecto ojo de gato", precio: 35
    },
    reparacion: { id: "reparacion", nombre: "Reparación de uña", precio: 15 },
};
export const CUPONES: Record<string, number> = {
    COQUETTE10: 0.1,
    SPOOKY15: 0.15,
};
export const HORARIO = { abre: 9, ultimaCita: 17 };
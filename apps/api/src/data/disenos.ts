import type { ColeccionId, Diseno } from "@coquette/shared";

// [id, nombre, colección, precio base, descripción]
const filas: [string, string, ColeccionId, number, string][] = [
  ["carey-hojas-doradas", "Carey & Hojas Doradas", "otono", 195, "Efecto carey con hojas de maple, ramitas y perlitas doradas."],
  ["maple-terracota", "Maple Terracota", "otono", 150, "Terracota brillante con uñas crema y hojitas de maple."],
  ["bosque-de-otono", "Bosque de Otoño", "otono", 155, "Naranja quemado con flores otoñales pintadas a mano."],
  ["tarot-celestial", "Tarot Celestial", "spooky", 210, "Morado profundo con lunas, soles y estrellas doradas."],
  ["brujita-lila", "Brujita Lila", "spooky", 190, "Stiletto nude con puntas lila, sombreritos de bruja y moños."],
  ["spooky-coquette", "Spooky Coquette", "spooky", 185, "Fantasmita, telaraña y moño rosa sobre french negro."],
  ["llamas-de-luna", "Llamas de Luna", "spooky", 220, "Negro con llamas, luna y estrellas en cromo plateado."],
  ["monos-violeta", "Moños Violeta", "spooky", 180, "French morado con moños y destellos cromados."],
  ["glitter-vino-monos", "Glitter Vino con Moños", "gotica", 185, "Glitter vino, moño, corazón y destellos sobre nude."],
  ["ojo-de-gato-vino", "Ojo de Gato Vino", "gotica", 170, "Efecto ojo de gato en tono vino oscuro."],
  ["rosa-y-negro-coquette", "Rosa & Negro Coquette", "gotica", 175, "Rosa con french negro, moñitos y estrellas."],
  ["mariposa-cromo-negra", "Mariposa Cromo Negra", "gotica", 200, "French negro ahumado con mariposas y estrellas cromadas."],
  ["corazones-y-monitos", "Corazones & Moñitos", "cherry", 170, "Rojo vino, blanco con corazones y moños rojos."],
  ["cereza-y-perla", "Cereza & Perla", "cherry", 180, "Nude con cerezas, moños blancos, french vino y perlitas."],
  ["cherry-blossom", "Cherry Blossom", "cherry", 175, "Vino brillante con cerezas, moños y corazones."],
  ["jelly-rojo", "Jelly Rojo", "cherry", 140, "Rojo glossy y rosa jelly con brillitos."],
  ["rosa-enamorada", "Rosa Enamorada", "cherry", 165, "Tonos rosa con corazones, flor 3D y moño."],
  ["salvia-y-hojitas", "Salvia & Hojitas", "botanica", 160, "Verde salvia y nude con ramitas pintadas."],
  ["olivo-y-caramelo", "Olivo & Caramelo", "botanica", 165, "Verde olivo con hojitas, toque caramelo y perla."],
  ["mantequilla-y-monos", "Mantequilla & Moños", "pastel", 165, "Amarillo pastel, french amarillo, moños 3D y florecita."],
  ["margaritas-french", "Margaritas French", "pastel", 170, "French amarillo con margaritas blancas y líneas doradas."],
  ["mauve-floral-3d", "Mauve Floral 3D", "pastel", 160, "Mauve brillante con flores en relieve."],
  ["caramelo-glitter", "Caramelo Glitter", "caramelo", 190, "Café caramelo con glitter y moños dorados."],
  ["coffin-chocolate", "Coffin Chocolate", "caramelo", 185, "Forma coffin, french chocolate, moños dorados y perlas."],
  ["lunares-y-cuadros", "Lunares & Cuadros", "caramelo", 170, "Nude con estrellitas, lunares y cuadros."],
  ["aura-sirena", "Aura Sirena", "sirena", 195, "Degradado azul aurora con mariposa y corazón cromados."],
  ["navy-monitos", "Navy Moñitos", "sirena", 155, "Azul marino con moños y estrellas pintadas."],
];

export const disenos: Diseno[] = filas.map(([id, nombre, coleccion, precioBase, descripcion]) => ({
  id,
  nombre,
  coleccion,
  precioBase,
  descripcion,
  imagen: `/api/imagenes/${id}.jpeg`,
}));
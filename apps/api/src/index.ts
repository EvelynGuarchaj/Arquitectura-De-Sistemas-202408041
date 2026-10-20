import { app } from "./app.js";
const PUERTO = Number(process.env.PORT ?? 3001);
app.listen(PUERTO, () => {
console.log(` API lista en http://localhost:${PUERTO}`);
});

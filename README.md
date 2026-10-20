# Yaniz Studio

Catálogo y reservas de un estudio de uñas, construido como **monorepo** con **Turborepo** y pnpm workspaces**.

La clienta ve los 27 diseños, los filtra por colección, elige uno y reserva su cita. Mientras llena el formulario ve el precio en vivo, y la API vuelve a validar y calcular todo al guardar la cita, con el mismo código que usa la web.

## Estructura del monorepo

Arquitectura-De-Sistemas-202408041/
- apps/
	- api/          # Backend: Express y TypeScript:  http://localhost:3001
	- web/          # Frontend: React Vite: http://localhost:5173
- packages/
	- shared/       # @coquette/shared: tipos, catálogo, precios y validación de citas
- docs/capturas/    # capturas de pantalla
- package.json      # scripts de la raíz (turbo run …)
- pnpm-workspace.yaml
- turbo.json        # tareas y su orden
- tsconfig.base.json

| Paquete | Qué hace | Qué usa de `@coquette/shared` |
| --- | --- | --- |
| `apps/web` | Catálogo con filtros por colección y formulario de reserva | `calcularPrecio()`, `validarCita()`, `formatearQuetzales()`, `COLECCIONES`, `EXTRAS` y los tipos |
| `apps/api` | API REST con los diseños, las fotos y las citas | `validarCita()`, `calcularPrecio()`, `COLECCIONES` y los tipos |
| `packages/shared` | Librería compartida con tipos, catálogo, cálculo de precio y validación de citas | — |

### Endpoints de la API

| Método | Ruta                            | Descripción                               |
| ------ | ------------------------------- | ----------------------------------------- |
| GET    | `/api/salud`                    | Revisa que la API esté funcionando        |
| GET    | `/api/colecciones`              | Lista las 8 colecciones                   |
| GET    | `/api/disenos?coleccion=cherry` | Lista los diseños (filtro opcional)       |
| GET    | `/api/disenos/:id`              | Un diseño, o `404`                        |
| POST   | `/api/citas`                    | Valida, calcula el total y guarda la cita |
| GET    | `/api/citas`                    | Lista las citas guardadas                 |
| GET    | `/api/imagenes/<id>.jpeg`       | Fotos de los diseños                      |

## Herramienta elegida: Turborepo

**Turborepo** es una herramienta para administrar monorepos de JavaScript/TypeScript. Se monta sobre los _workspaces_ del gestor de paquetes (en este caso **pnpm**) y se encarga de correr las tareas (`build`, `dev`, `test`) de todos los paquetes en el orden correcto.

Lo elegí porque compila primero @coquette/shared y después las apps que dependen de ella. Api y web se compilan y se prueban al mismo tiempo y con filtros se puede correr una sola app (`pnpm dev:web`, `pnpm test:api`). Además que todo se configura en un solo archivo `turbo.json`

Y pnpm porque guarda cada dependencia solamente en el proyecto lo cuál ahorra espacio y deja claro cuándo una app usa un paquete local del monorepo.

## Tecnologías

- **Frontend:** React 19 + Vite 8
- **Backend:** Express 5 sobre Node.js
- **Lenguaje:** TypeScript
- **Pruebas:** Vitest, Supertest y Testing Library
- **Monorepo:** Turborepo 2 + pnpm 12

## Comandos disponibles

Todos se corren desde la **raíz** del repositorio.

- `pnpm install`: Instala las dependencias de todo el monorepo                        
- `pnpm dev`: Levanta todo: shared en modo watch, la API (3001) y la web (5173) 
- `pnpm dev:web`: Levanta solo el frontend    
- `pnpm dev:api`: Levanta solo el backend
- `pnpm build`: Compila todo en orden: `shared` → `api` y `web`
- `pnpm build:web`: Compila solo el frontend (y `shared`, que necesita)
- `pnpm build:api`:Compila solo el backend (y `shared`, que necesita)
- `pnpm build:shared`: Compila solo la librería compartida
- `pnpm test`: Corre las pruebas de los 3 paquetes
- `pnpm test:web`:Pruebas del frontend
- `pnpm test:api`: Pruebas del backend
- `pnpm test:shared`: Pruebas de la librería compartida
- `pnpm start:api`:Compila la API y la corre con Node (versión de producción)

## Ejecutar el proyecto desde cero

1. **Requisitos:** Node.js 24 LTS (mínimo 22.13) y pnpm 12
    ```bash
    npm install -g pnpm@latest
    ```
    
2. **Clonar el repositorio y entrar a la rama:**
    
    ```bash
    git clone https://github.com/EvelynGuarchaj/Arquitectura-De-Sistemas-202408041.git
    cd Arquitectura-De-Sistemas-202408041
    git switch hw-05
    ```
    
3. **Instalar dependencias:**
    
    ```bash
    pnpm install
    ```
    
4. **Levantar todo:**
    
    ```bash
    pnpm dev
    ```
    
5. **Abrir:**
    
    - Web: http://localhost:5173
    - API: http://localhost:3001/api/salud
6. **Correr las pruebas:**
    
    ```bash
    pnpm test
    ```
    
## Convención de commits

Este repositorio usa [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/): `tipo(alcance): descripción`, con los tipos `feat`, `fix`, `test`, `docs`, `style`, `build` y `chore`, y los alcances `shared`, `api` y `web`.
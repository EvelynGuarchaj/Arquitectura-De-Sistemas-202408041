# Tarea Django + REST Framework + JWT

Proyecto pequeño para fandoms del kpop. Tiene 5 aplicaciones con un modelo
cada una (grupos, integrantes, albumes, doramas y fans), más la app `usuarios`
para el registro y el login.

## Cómo ejecutarlo

```bash
cd fandom_completo
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py cargar_datos
python3 manage.py createsuperuser
python3 manage.py runserver
```

Después se abre http://127.0.0.1:8000/admin/ y se entra con el usuario creado
en `createsuperuser`.

## Cómo probar el login con JWT

Con el servidor corriendo, en otra terminal:

**1. Registrar un usuario**

```bash
curl -X POST http://127.0.0.1:8000/api/v1/registro/ \
  -H "Content-Type: application/json" \
  -d '{"username":"prueba","email":"prueba@ejemplo.com","password":"clave12345"}'
```

**2. Hacer login**

```bash
curl -X POST http://127.0.0.1:8000/api/v1/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"prueba","password":"clave12345"}'
```

Devuelve los tokens `access` y `refresh`. Se guarda el `access` en una variable:

```bash
TOKEN="pegar_aqui_el_access"
```

**3. Usar la API con el token**

```bash
curl http://127.0.0.1:8000/api/v1/perfil/ -H "Authorization: Bearer $TOKEN"
curl http://127.0.0.1:8000/api/v1/grupos/ -H "Authorization: Bearer $TOKEN"
```

Sin el token, las mismas rutas responden `401`.

**4. Renovar el token**

```bash
curl -X POST http://127.0.0.1:8000/api/v1/login/renovar/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"pegar_aqui_el_refresh"}'
```

## Rutas

| Ruta | Métodos | Pide token |
|---|---|---|
| `/api/v1/registro/` | POST | No |
| `/api/v1/login/` | POST | No |
| `/api/v1/login/renovar/` | POST | No |
| `/api/v1/perfil/` | GET | Sí |
| `/api/v1/grupos/` y `/api/v1/grupos/<id>/` | GET, POST, PUT, DELETE | Sí |

Las rutas de `integrantes`, `albumes`, `doramas` y `fans` funcionan igual que
las de `grupos`.

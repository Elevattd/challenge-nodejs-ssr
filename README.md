![screenshot](https://puu.sh/HyrmV/95c458d9d9.png)

#

# Nubi Coding Challenge ☁️

&nbsp;

## Finalidad ✨

El objetivo de este desafío es desarrollar una API REST usando NodeJS. Dentro del directorio `data` encontrarás el
archivo `users.json`. Utiliza ese archivo como fuente de datos para desarrollar una API que realizce las operaciones
abajo descritas. Si necesitas generar nuevos usuarios puedes usar el comando `npm run data`.

&nbsp;

## Como correr el proyecto.

Para correr el proyecto, descargar este repositorio en el docker server, o tener instalado docker en el sistema
operativo donde se quiera correr el proyecto y usar el comando `docker-compose up -d` (desde el root del proyecto). Esto
expondra el puerto 3001 del docker server. O desde windows npm run start.

&nbsp;

## Rutas

-   /users: GET (Acepta query params) => Devuelve un listado de los usuarios.

    -   pagination: `?page=2&limit=5`
    -   sorting: `?sortBy=email&sortDirection=ascending`
    -   matching: `?match[email]=jdoe@example.com`

-   /users: POST => Crea un nuevo usuario.
    -   JSON FORMAT: {"email": "string","name": "string","last_name": "string","sex_type": "string","dni":
        number,"birth_date": "string",}

&nbsp;

## HEADERS 💡 (Se encuentran en el archivo .env)

-   Se debe enviar 'x-api-key'
-   Se debe enviar 'Bearer token'

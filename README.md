# API Servicios Críticos

Esta proyecto fue construido para el Taller de Software del Diploma de Postítulo en Ingeniería de Software.

Incluye una API REST completa para la gestión de farmacias de turno, autenticación JWT, y ejemplos de middleware de seguridad y validación.

Forma parte inicial de proyecto **"Emergencia 24/7: Red Social de Servicios Críticos"**.

## Requisitos

Para utilizar esta plantilla se recomienda tener instalado:
- [Docker](https://docs.docker.com/desktop/) o [Podman](https://podman-desktop.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [GitHub Desktop](https://desktop.github.com/download/)

Al abrir el repositorio en VSCode, se sugerirá el uso de DevContainers y la instalación de extensiones recomendadas.

## Instrucciones para levantar proyecto
Para levantar el proyecto seguir las siguientes instrucciones:
1. Clonar y abrir repositorio en VSCode.
2. Configurar variables de entorno y editar tus configuraciones según archivo de referencia:
    - `cp .env.example .env`
3. Instalar extensión "Dev Containers".
4. Ejecutar:
    - Windows: `CTRL + SHIFT + P` y buscar `Dev Containers: Rebuild and Reopen in Container`
    - MacOS: `COMMAND + SHIFT + P` y buscar `Dev Containers: Rebuild and Reopen in Container`
5. Iniciar servidor:
    - `npm run dev`

## Instrucciones para pruebas

1. Utilizar [Postman](https://www.postman.com/downloads/) o alguna herramienta para ejecutar peticiones HTTP.
2. Descargar colecciones de Postman ubicadas en: `/collections/`
3. Importar colecciones en Postman.
3. Ejecutar peticiones contenidas en Postman:
    - **Ciudadano - Servicios Críticos**
        - Autenticar (paso obligatorio) y Consultar Servicios Críticos (Lista y cercanos)
        - Autenticar (paso obligatorio) y realizar pruebas de casos no permitidos para el Usuario. (Crear, Actualizar y Eliminar)
    - **Ciudadano - Servicios Críticos**
        - Autenticar (paso obligatorio) y realizar diversas acciones CRUD (Crear, Actualizar y Eliminar)


## Automatizaciones

Este proyecto posee scripts npm para automatizar tareas comunes de desarrollo y mantenimiento. Cada comando puede ejecutarse con `npm run <script>` desde la terminal.

### Servidor y base de datos

- **dev**: inicia el servidor de desarrollo con recarga automática (`nodemon`).
- **start**: inicia el servidor en modo producción.
- **db:create**: crea la base de datos definida en la configuración.
- **migrate**: aplica las migraciones pendientes a la base de datos.
- **seed**: carga datos de ejemplo desde los seeders.
- **db:setup**: crea la base de datos, ejecuta migraciones y seeders.
- **db:reset**: elimina y recrea la base de datos, migraciones y seeders.

También puedes usar el script bash `scripts/init-db.sh` para inicializar la base de datos desde la terminal.

### Calidad y seguridad de código

- **lint**: ejecuta ESLint en todo el proyecto.
- **lint:fix**: corrige errores de lint automáticamente.
- **pre-commit**: ejecuta `lint-staged` antes de cada commit para asegurar calidad de código.

### Dependencias relevantes

Instaladas automáticamente con `npm install`:
- express, cors, helmet, dotenv, jsonwebtoken, bcryptjs, express-validator, express-rate-limit, pg, sequelize
- eslint, prettier, husky, lint-staged, nodemon, sequelize-cli, supertest

### Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run start      # Servidor en producción
npm run lint       # Verifica errores de lint
npm run lint:fix   # Corrige errores automáticamente
```

### Uso del hook de pre-commit

Antes de hacer un commit, `husky` ejecuta automáticamente:

```bash
npx lint-staged
```

Esto evita que se cometan archivos con errores de estilo. Si `eslint --fix` puede resolverlos, lo hará automáticamente; si no, el commit fallará.

### Uso demostrado de linters

```bash
echo "import { Router } from 'express'
const foo =   'hola'
console.log(foo)" > test.js

git add test.js

git commit -m "Probando pre-commit"
```

El commit será rechazado si hay errores no corregibles.

# 📋 README.md completo

# Servicios Críticos API

API REST para la gestión de servicios críticos de emergencia, específicamente farmacias.

## 🚀 Características

- **Autenticación JWT** con roles diferenciados
- **CRUD completo** para gestión de farmacias
- **Base de datos PostgreSQL** con Sequelize ORM
- **Middleware de seguridad** integrado
- **Validación de datos** con express-validator
- **Rate limiting** para protección contra ataques
- **Dev Container** para desarrollo consistente

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 12+
- Docker (para Dev Containers)

## 🛠️ Instalación

### Usando Dev Container (Recomendado)

1. Abrir proyecto en VSCode
2. Instalar extensión "Dev Containers"
3. Ejecutar: `Dev Containers: Reopen in Container`

### Instalación Manual

````bash
# Clonar repositorio
git clone https://github.com/tu-usuario/servicios-criticos-app.git
cd servicios-criticos-app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Inicializar base de datos
npm run db:setup # O `npm run db:reset` para recrear todo

### ⚠️ Nota Importante sobre ES Modules y Sequelize
Este proyecto utiliza ES Modules (`"type": "module"` en `package.json`). La versión actual de `sequelize-cli` (v6) requiere que los archivos de migración y seeder usen la extensión `.cjs` para ser compatibles.

**Al crear una nueva migración o seeder:**
1. Genera el archivo como de costumbre (ej: `npx sequelize-cli migration:generate --name create-new-table`).
2. `sequelize-cli` creará un archivo con extensión `.js`.
3. **Debes renombrar manualmente el archivo a `.cjs`** para que los comandos `npm run migrate` y `npm run seed` funcionen.

Ejemplo: `migrations/xxxxxxxx-create-new-table.js` -> `migrations/xxxxxxxx-create-new-table.cjs`

## ✨ Linting, Formateo y Pre-commits

Este proyecto incluye herramientas modernas para mantener la calidad del código:

- **ESLint**: análisis estático con configuración recomendada de `@eslint/js`.
- **Prettier**: formateador de código automático.
- **lint-staged**: solo ejecuta ESLint en archivos modificados antes del commit.
- **Husky**: ejecuta hooks Git como `pre-commit`.

### 📦 Dependencias relevantes

Instaladas automáticamente con `npm install`:

```bash
eslint
prettier
eslint-plugin-prettier
eslint-config-prettier
@eslint/js
globals
husky
lint-staged
````

### 🔧 Scripts disponibles

```bash
npm run lint       # Verifica errores de lint en todo el proyecto
npm run lint:fix   # Corrige errores automáticamente
```

### ✅ Uso del hook de pre-commit

Antes de hacer un commit, `husky` ejecuta automáticamente:

```bash
npx lint-staged
```

Esto evita que se cometan archivos con errores de estilo. Si `eslint --fix` puede resolverlos, lo hará automáticamente; si no, el commit fallará.

### 🧪 Prueba rápida

```bash
echo "const foo =   'hola'
console.log(foo)" > test.js

git add test.js

git commit -m "Probando pre-commit"
```

El commit será rechazado si hay errores no corregibles.

# Iniciar servidor

npm run dev

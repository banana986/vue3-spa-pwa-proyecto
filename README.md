# Proyecto SPA / PWA con Vue 3 y Consumo de API

## Requisitos previos
- Node.js (v18 o superior)

## Instalación y ejecución en VS Code
1. Abre esta carpeta en Visual Studio Code.
2. Abre la terminal (`Ctrl + ~`) y ejecuta:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre la URL indicada (por defecto `http://localhost:5173`).

## Estructura del Proyecto
- `src/services/api.js`: Servicio HTTP centralizado con validación `response.ok` y `AbortController` para evitar condiciones de carrera.
- `src/components/ItemCard.vue`: Componente hijo que recibe datos vía `props` y emite eventos.
- `src/views/HomeView.vue`: Vista principal con manejo de estados (`carga`, `éxito`, `vacío`, `error`) y formulario reactivo.
- `src/router/index.js`: Enrutador del lado del cliente.
- `public/manifest.json` y `public/sw.js`: Configuración PWA (instalación y caché offline).

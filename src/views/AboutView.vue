<template>
  <section class="about-card">
    <h1>Acerca de la Aplicación</h1>
    <p>
      Esta Single Page Application (SPA) y Progressive Web App (PWA) fue construida con
      <strong>Vue 3 (Composition API)</strong> y <strong>Vue Router</strong>.
    </p>
    <ul>
      <li><strong>Arquitectura modular:</strong> Separación clara entre vistas, componentes con props/eventos y servicio HTTP.</li>
      <li><strong>Manejo robusto de red:</strong> Validación estricta de <code>response.ok</code> y prevención de condiciones de carrera con <code>AbortController</code>.</li>
      <li><strong>Soporte PWA:</strong> Manifiesto web y Service Worker con estrategia Cache-First para recursos estáticos.</li>
    </ul>
  </section>
</template>

<style scoped>
.about-card {
  background: #ffffff;
  padding: 1.75rem;
  border-radius: 8px;
  border: 1px solid #e0e6ed;
  line-height: 1.6;
}

h1 {
  color: #35495e;
  margin-bottom: 1rem;
}

ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>

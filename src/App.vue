<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="brand">Vue 3 SPA / PWA</div>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/acerca">Acerca de</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  background-color: #f4f6f8;
  color: #2c3e50;
}

.navbar {
  background-color: #35495e;
  color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-weight: 700;
  font-size: 1.2rem;
  color: #42b883;
}

.navbar nav {
  display: flex;
  gap: 1.5rem;
}

.navbar a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
}

.navbar a.router-link-active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
  padding-bottom: 2px;
}

.main-content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>

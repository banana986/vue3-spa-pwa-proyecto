<script setup>
import { ref, computed, onMounted } from 'vue';
import { apiClient } from '../services/api';
import ItemCard from '../components/ItemCard.vue';

// Estados reactivos requeridos: carga, éxito, vacío y error
const items = ref([]);
const loading = ref(false);
const error = ref(null);

// Filtro y formulario reactivo
const searchQuery = ref('');
const newTitle = ref('');
const newBody = ref('');
const submitting = ref(false);

const filteredItems = computed(() => {
  const term = searchQuery.value.trim().toLowerCase();
  if (!term) return items.value;
  return items.value.filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      item.body.toLowerCase().includes(term)
  );
});

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await apiClient.get('posts?_limit=8', { abortPrevious: true });
    if (data) {
      items.value = data;
    }
  } catch (err) {
    error.value = 'No se pudieron cargar los registros desde la API. Verifica tu conexión.';
  } finally {
    loading.value = false;
  }
};

const handleCreate = async () => {
  if (!newTitle.value.trim() || !newBody.value.trim()) return;
  submitting.value = true;
  try {
    const created = await apiClient.post('posts', {
      title: newTitle.value,
      body: newBody.value,
      userId: 1
    });
    // Asignamos un ID único local para mantener claves estables en la lista
    items.value.unshift({
      ...created,
      id: Date.now()
    });
    newTitle.value = '';
    newBody.value = '';
  } catch (err) {
    alert('Error al crear el elemento.');
  } finally {
    submitting.value = false;
  }
};

const handleRemove = (id) => {
  items.value = items.value.filter((item) => item.id !== id);
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <section>
    <div class="header-actions">
      <h1>Gestión de Registros (SPA / PWA)</h1>
      <button class="btn-refresh" @click="fetchData" :disabled="loading">
        Recargar API
      </button>
    </div>

    <!-- Formulario controlado -->
    <form class="create-form" @submit.prevent="handleCreate">
      <h2>Agregar Nuevo Registro</h2>
      <input
        v-model="newTitle"
        type="text"
        placeholder="Título del registro"
        required
      />
      <textarea
        v-model="newBody"
        rows="2"
        placeholder="Descripción o contenido"
        required
      ></textarea>
      <button type="submit" class="btn-primary" :disabled="submitting">
        {{ submitting ? 'Guardando...' : 'Crear Registro' }}
      </button>
    </form>

    <!-- Buscador reactivo -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Filtrar registros por título o contenido..."
      />
    </div>

    <!-- 1. Estado de Carga -->
    <div v-if="loading" class="state-box loading">
      Cargando información desde la API...
    </div>

    <!-- 2. Estado de Error -->
    <div v-else-if="error" class="state-box error">
      <p>{{ error }}</p>
      <button class="btn-primary" @click="fetchData">Reintentar</button>
    </div>

    <!-- 3. Estado Vacío -->
    <div v-else-if="filteredItems.length === 0" class="state-box empty">
      No se encontraron registros disponibles.
    </div>

    <!-- 4. Estado de Éxito con claves estables (:key) -->
    <div v-else class="items-list">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @remove="handleRemove"
      />
    </div>
  </section>
</template>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.create-form {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e0e6ed;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.create-form h2 {
  font-size: 1.1rem;
  color: #35495e;
}

input, textarea {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #ccd4dc;
  border-radius: 6px;
  font-size: 0.95rem;
}

.search-box {
  margin-bottom: 1.25rem;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}

.btn-primary:hover {
  background-color: #369f6e;
}

.btn-refresh {
  background-color: #35495e;
  color: white;
  border: none;
  padding: 0.55rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.state-box {
  text-align: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e6ed;
}

.state-box.error {
  border-color: #e74c3c;
  color: #c0392b;
}

.state-box.error p {
  margin-bottom: 1rem;
}
</style>

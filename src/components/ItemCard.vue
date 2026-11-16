<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['remove']);
</script>

<template>
  <article class="card">
    <div class="card-header">
      <h3>{{ item.title }}</h3>
      <button class="btn-delete" @click="emit('remove', item.id)" title="Eliminar">
        Eliminar
      </button>
    </div>
    <p>{{ item.body }}</p>
  </article>
</template>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.card-header h3 {
  font-size: 1.05rem;
  color: #35495e;
  text-transform: capitalize;
}

.card p {
  color: #555;
  line-height: 1.5;
  font-size: 0.95rem;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-delete:hover {
  background-color: #c0392b;
}
</style>

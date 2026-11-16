// Servicio HTTP centralizado
// Usa JSONPlaceholder por defecto para que funcione de inmediato; cámbialo por tu API propia si lo deseas.
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

let activeController = null;

export const apiClient = {
  async get(endpoint, { abortPrevious = false } = {}) {
    // Evita condiciones de carrera cancelando peticiones previas en curso
    if (abortPrevious && activeController) {
      activeController.abort();
    }
    const controller = new AbortController();
    if (abortPrevious) {
      activeController = controller;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      // Validación estricta de response.ok requerida
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.info('Petición anterior cancelada para evitar condición de carrera.');
        return null;
      }
      console.error('Fallo en la petición HTTP:', error);
      throw error;
    }
  },

  async post(endpoint, payload) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }
};

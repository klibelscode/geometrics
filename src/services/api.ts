import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 12000,
  headers: {
    'Accept': 'application/json'
  }
});

// Interceptor inteligente de respuestas
api.interceptors.response.use(
  (response) => {
    // Si la API responde 200 pero mete el texto tramposo en el body, lo tratamos como error
    if (response.data === 'PRO FEATURE ONLY' || (typeof response.data === 'string' && response.data.includes('PRO FEATURE'))) {
      console.warn('⚠️ Alerta: El servidor intentó bloquear la petición con "PRO FEATURE ONLY". Forzando reintento o manejo de error.');
      return Promise.reject(new Error('Servidor saturado (Filtro PRO activo).'));
    }
    return response;
  },
  (error) => {
    // Manejo tradicional de errores de red (400, 404, 500, etc.)
    console.error('Error de red interceptado:', error.message);
    return Promise.reject(error);
  }
);

export default api;
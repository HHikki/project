import axios from 'axios';

const API_URL = 'http://localhost/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    try {
      const response = await api.post('/auth.php?action=register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al registrar usuario');
    }
  },

  async login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post('/auth.php?action=login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  },
};
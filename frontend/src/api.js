import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Livros
export const getLivros = () => api.get('/livros');
export const createLivro = (data) => api.post('/livros', data);
export const updateLivro = (id, data) => api.put(`/livros/${id}`, data);
export const deleteLivro = (id) => api.delete(`/livros/${id}`);

// Reservas
export const getReservas = () => api.get('/reservas');
export const createReserva = (data) => api.post('/reservas', data);
export const updateReserva = (id, data) => api.put(`/reservas/${id}`, data);
export const deleteReserva = (id) => api.delete(`/reservas/${id}`);

// Login
export const login = (data) => axios.post(`${process.env.REACT_APP_API_URL}/login`, data);

export default api;
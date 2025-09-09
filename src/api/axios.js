import axios from 'axios';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global', // базовий URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default api;

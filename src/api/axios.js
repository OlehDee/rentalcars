import axios from 'axios';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
  // Прибираємо ''/null/undefined з query, щоби бекенд точно бачив лише валідні фільтри
  paramsSerializer: {
    serialize: (params) => {
      const clean = Object.entries(params || {}).reduce((acc, [k, v]) => {
        if (v === '' || v === undefined || v === null) return acc;
        acc[k] = v;
        return acc;
      }, {});
      return new URLSearchParams(clean).toString();
    },
  },
});

export default api;

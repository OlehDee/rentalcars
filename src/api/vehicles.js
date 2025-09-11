// src/api/vehicles.js
import api from './axios';

// Нормалізуємо параметри згідно зі Swagger:
// brand, rentalPrice (string), minMileage, maxMileage, page, limit
const normalizeParams = (params = {}) => {
  const {
    brand = '',
    rentalPrice = '',
    minMileage = '',
    maxMileage = '',
    page = 1,
    limit = 12,
  } = params;

  return {
    ...(brand ? { brand } : {}),
    ...(rentalPrice !== '' ? { rentalPrice: String(rentalPrice) } : {}),
    ...(minMileage !== '' ? { minMileage: Number(minMileage) } : {}),
    ...(maxMileage !== '' ? { maxMileage: Number(maxMileage) } : {}),
    page: Number(page) || 1,
    limit: Number(limit) || 12,
  };
};

// Отримати список авто з бекенду з урахуванням фільтрів
export const fetchVehiclesAPI = (params) =>
  api.get('/cars', { params: normalizeParams(params) });

// Отримати авто за ID
export const fetchVehicleByIdAPI = (id) =>
  api.get(`/cars/${id}`);

// Отримати список брендів
export const fetchBrandsAPI = () =>
  api.get('/brands');

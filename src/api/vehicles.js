import api from './axios';

/**
 * Отримати список авто з фільтрами
 * @param {Object} params - параметри запиту
 * @param {string} [params.brand] - фільтр по бренду
 * @param {number} [params.price] - макс. ціна оренди
 * @param {number} [params.mileage_from] - пробіг від
 * @param {number} [params.mileage_to] - пробіг до
 * @param {number} [params.page=1] - сторінка
 * @param {number} [params.limit=12] - кількість на сторінку
 */
export const fetchVehiclesAPI = (params) => {
  return api.get('/cars', { params });
};

/**
 * Отримати авто за ID
 * @param {string|number} id - ідентифікатор авто
 */
export const fetchVehicleByIdAPI = (id) => {
  return api.get(`/cars/${id}`);
};

export const fetchBrandsAPI = () => {
  return api.get('/brands');
};

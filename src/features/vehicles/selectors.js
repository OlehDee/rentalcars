export const selectVehicles = (state) => state.vehicles.items;
export const selectTotalCars = (state) => state.vehicles.totalCars;
export const selectPage = (state) => state.vehicles.page;
export const selectTotalPages = (state) => state.vehicles.totalPages;
export const selectBrands = (state) => state.vehicles.brands;
export const selectCurrentCar = (state) => state.vehicles.currentCar;
export const selectIsLoading = (state) => state.vehicles.isLoading;
export const selectError = (state) => state.vehicles.error;
export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some(c => c.id === id);


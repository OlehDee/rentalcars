import { configureStore } from '@reduxjs/toolkit';
import { vehiclesReducer } from '../features/vehicles/vehiclesSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    favorites: favoritesReducer,
  },
});

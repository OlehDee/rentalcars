import { createSlice } from '@reduxjs/toolkit';

const load = () => {
  try { return JSON.parse(localStorage.getItem('favorites')) || []; }
  catch { return []; }
};
const save = (items) => localStorage.setItem('favorites', JSON.stringify(items));

const initialState = { items: load() };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload }) => {
      if (!state.items.some(c => c.id === payload.id)) {
        state.items.push(payload);
        save(state.items);
      }
    },
    removeFavorite: (state, { payload: id }) => {
      state.items = state.items.filter(c => c.id !== id);
      save(state.items);
    },
    toggleFavorite: (state, { payload }) => {
      const exists = state.items.some(c => c.id === payload.id);
      state.items = exists
        ? state.items.filter(c => c.id !== payload.id)
        : [...state.items, payload];
      save(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

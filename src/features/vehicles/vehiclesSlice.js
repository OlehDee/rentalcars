import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVehiclesAPI, fetchVehicleByIdAPI, fetchBrandsAPI } from '../../api/vehicles';

// ===================== ASYNC THUNKS =====================

// Отримати список авто
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async ({ append = false, ...params }, { rejectWithValue }) => {
    try {
      const { data } = await fetchVehiclesAPI(params);
      return { ...data, append };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Отримати деталі авто
export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchVehicleById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await fetchVehicleByIdAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Отримати бренди
export const fetchBrands = createAsyncThunk(
  'vehicles/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchBrandsAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===================== INITIAL STATE =====================

const initialState = {
  items: [],
  totalCars: 0,
  page: 1,
  totalPages: 1,
  brands: [],
  currentCar: null,
  isLoading: false,
  error: null,
};

// ===================== SLICE =====================

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    clearCurrentCar: (state) => {
      state.currentCar = null;
    },
    resetVehicles: (state) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.totalCars = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- fetchVehicles ----
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        const { cars, totalCars, page, totalPages, append } = action.payload;

        state.totalCars = totalCars;
        state.page = Number(page);         // конвертуємо у число
        state.totalPages = Number(totalPages);

        state.items = append ? [...state.items, ...cars] : cars;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ---- fetchVehicleById ----
      .addCase(fetchVehicleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCar = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ---- fetchBrands ----
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ===================== EXPORTS =====================

export const { clearCurrentCar, resetVehicles } = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;

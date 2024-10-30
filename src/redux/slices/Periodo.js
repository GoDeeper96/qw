// slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para realizar la petición GET
export const fetchPeriodo = createAsyncThunk('data/fetchPeriodo', async () => {
  const response = await axios.get('http://localhost:4000/api/getperiodo');
  return response.data;
});

// Función para cargar los datos desde localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('Periodo');
    if (serializedState === null) {
      return []; // Si no hay nada en localStorage, devuelve un array vacío
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error cargando localStorage", e);
    return [];
  }
};

// Slice de Redux
const PeriodoSlice = createSlice({
  name: 'data',
  initialState: {
    data: loadFromLocalStorage(), // Carga desde localStorage
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeriodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;

        // Guarda los datos en localStorage
        localStorage.setItem('Periodo', JSON.stringify(action.payload));
      })
      .addCase(fetchPeriodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default PeriodoSlice.reducer;
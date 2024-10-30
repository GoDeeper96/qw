import { configureStore } from '@reduxjs/toolkit';
import PeriodoSlice from './slices/Periodo';

export const store = configureStore({
  reducer: {
    data: PeriodoSlice,
  },
});
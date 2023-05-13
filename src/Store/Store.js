import { configureStore } from '@reduxjs/toolkit'
import DashboardSlice from '../features/DashboardSlice'

export const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
  },
})
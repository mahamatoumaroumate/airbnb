import { configureStore } from '@reduxjs/toolkit'
import productSlice from './helper/productSlice'
export const store = configureStore({
  reducer: {
    product: productSlice,
  },
})

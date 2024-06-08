import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  search: '',
  sidebar: false,
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value
    },
    handleSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
  },
})
export const { handleChange, handleSidebar } = productSlice.actions
export default productSlice.reducer

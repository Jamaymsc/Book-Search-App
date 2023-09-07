import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    setBooks(state, action) {
      state.items = action.payload;
    },
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
  },
});

export const { setBooks, setTotalItems } = bookSlice.actions;

export default bookSlice.reducer;
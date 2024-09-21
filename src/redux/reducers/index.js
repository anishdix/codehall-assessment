import { createSlice } from '@reduxjs/toolkit';



const bookSlice = createSlice({
  name: 'books',
   initialState : {
    books: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    searchQuery: '',
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setBooks,
  setLoading,
  setError,
  setCurrentPage,
  setTotalPages,
  setSearchQuery,
} = bookSlice.actions;

export default bookSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategories: 0,
  page: 1,
  sort: {
    name: "алфавиту (DESC)",
    sortProperty: "title",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategories(state, action) {
      state.activeCategories = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.page = action.payload;
    },
    setFiltres(state, action) {
      state.activeCategories = Number(action.payload.activeCategories);
      state.page = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      
    },
  },
});

export const { setActiveCategories, setSort, setCurrentPage, setFiltres } =
  filterSlice.actions;
export default filterSlice.reducer;

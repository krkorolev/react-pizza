import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type SortPizzas = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FillterSliceStatr {
  activeCategories: number;
  currentPage: number;
  sort: SortPizzas;
}

const initialState: FillterSliceStatr = {
  activeCategories: 0,
  currentPage: 1,
  sort: {
    name: "алфавиту (DESC)",
    sortProperty: SortPropertyEnum.TITLE_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategories(state, action: PayloadAction<number>) {
      state.activeCategories = action.payload;
    },
    setSort(state, action: PayloadAction<SortPizzas>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFiltres(state, action: PayloadAction<FillterSliceStatr>) {
      state.activeCategories = Number(action.payload.activeCategories);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const { setActiveCategories, setSort, setCurrentPage, setFiltres } =
  filterSlice.actions;
export default filterSlice.reducer;

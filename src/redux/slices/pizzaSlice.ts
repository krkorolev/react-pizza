import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from "axios";
import { CartItems } from "./cartSlice";

export type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  currentPage: number;
  activeCategories: number;
};
export type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};
export enum Status {
  LOADEING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',

} 

export const fetchPizza = createAsyncThunk<CartItems[],FetchPizzasArgs>(
  "pizza/fetchPizza",
  async (params) => {
    const { sortBy, order, currentPage, activeCategories } = params;
    const { data } = await axios.get(
      `https://645ce550e01ac610589682d1.mockapi.io/items?page=${currentPage}&limit=4&category=${
        activeCategories > 0 ? activeCategories : ""
      }&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

interface PizzaSliceStatr {
  pizzas: Pizza[];
  status: Status;
}

const initialState: PizzaSliceStatr = {
  pizzas: [],
  status: Status.LOADEING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADEING;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },

  // БЕЗ TS
  // extraReducers: {
  //   [fetchPizza.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [fetchPizza.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.pizzas = action.payload;
  //   },
  //   [fetchPizza.rejected]: (state) => {
  //     state.status = "error";
  //     state.pizzas = [];
  //   },
  // },
});

// export const {} = pizzaSlice.actions;
export default pizzaSlice.reducer;

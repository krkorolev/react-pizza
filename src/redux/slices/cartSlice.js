import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },

    removeCountPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    removeItemPizza(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    }
  },
});

export const {
  addItemPizza,
  addedCountPizza,
  removeCountPizza,
  removeItemPizza,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

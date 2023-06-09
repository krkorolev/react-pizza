import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItems = {
  id: string;
  title: string;
  imageUrl: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemPizza(state, action: PayloadAction<CartItems>) {
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

    removeCountPizza(state, action: PayloadAction<CartItems>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    removeItemPizza(state, action: PayloadAction<CartItems>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemPizza, removeCountPizza, removeItemPizza, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

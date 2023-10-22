import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        state.items = [
          ...state.items.filter((item) => item.id !== action.payload.id),
          {
            ...state.items.filter((item) => item.id === action.payload.id)[0],
            quantity: action.payload.quantity,
          },
        ];
      } else {
        state.items = [...state.items, action.payload];
      }
      return state;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      return state;
    },
    clearCart:(state,items)=>{
      state.items = []; 
      return state;
      },
      
  },
});

export const { addToCart, removeFromCart,clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;

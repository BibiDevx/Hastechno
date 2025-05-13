import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    carrito: cartReducer,
  },
  addToCart: (state, action) => {
      const existingItem = state.find(item => item.idProducto === action.payload.idProducto);
      if (existingItem) {
        existingItem.cantidad += action.payload.cantidad;
      } else {
        state.push({ ...action.payload });
      }
    },

});

export default store;

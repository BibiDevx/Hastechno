// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; // Asegúrate de que la ruta a tu authSlice sea correcta

const store = configureStore({
  reducer: {
    carrito: cartReducer,
    auth: authReducer, // Añade el authReducer a tu reducer
    // Aquí puedes añadir otros reducers para diferentes partes de tu estado global
  },
});

export default store;
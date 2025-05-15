// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // El estado inicial del carrito será un array vacío

export const cartSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.idProducto === action.payload.idProducto);
      if (existingItem) {
        existingItem.cantidad = (existingItem.cantidad || 0) + (action.payload.cantidad || 1);
      } else {
        state.push({ ...action.payload, cantidad: action.payload.cantidad || 1 });
      }
    },
    eliminarDelCarrito: (state, action) => {
      return state.filter(item => item.idProducto !== action.payload);
    },
    actualizarCantidad: (state, action) => {
      const itemToUpdate = state.find(item => item.idProducto === action.payload.idProducto);
      if (itemToUpdate) {
        itemToUpdate.cantidad = action.payload.nuevaCantidad;
      }
    },
    // Puedes agregar más reducers para limpiar el carrito, etc.
  },
});

export const { addToCart, eliminarDelCarrito, actualizarCantidad } = cartSlice.actions;

export default cartSlice.reducer;
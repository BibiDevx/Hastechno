// redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const producto = action.payload;
      const existe = state.find(p => p.idProducto === producto.idProducto);
      if (existe) {
        existe.cantidad += 1;
      } else {
        state.push({ ...producto, cantidad: 1 });
      }
    },
    eliminarDelCarrito: (state, action) => {
      return state.filter(p => p.idProducto !== action.payload);
    },
    actualizarCantidad: (state, action) => {
      const { idProducto, nuevaCantidad } = action.payload;
      const producto = state.find(p => p.idProducto === idProducto);
      if (producto && nuevaCantidad > 0) {
        producto.cantidad = nuevaCantidad;
      }
    },
    vaciarCarrito: () => {
      return [];
    },
  },
});

export const { addToCart, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = cartSlice.actions;
export default cartSlice.reducer;

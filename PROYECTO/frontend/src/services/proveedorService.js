// src/services/proveedorService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const proveedorService = {
  // Obtener todos los proveedores (para admin)
  getAllProveedores: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verProveedores`); // Ajustado a la ruta de lectura
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los proveedores:", error);
      throw error;
    }
  },

  // Obtener un proveedor por su ID (para admin)
  getProveedorById: async (idProveedor) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verProveedores/${idProveedor}`); // Ajustado a la ruta de lectura por ID
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el proveedor con ID ${idProveedor}:`, error);
      throw error;
    }
  },

  // Crear un nuevo proveedor (para admin)
  createProveedor: async (proveedorData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/proveedores/registrar`, proveedorData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de tener el token en localStorage
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear un proveedor:", error);
      throw error;
    }
  },

  // Actualizar un proveedor existente (para admin)
  updateProveedor: async (idProveedor, proveedorData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/proveedores/actualizar/${idProveedor}`, proveedorData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de tener el token en localStorage
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el proveedor con ID ${idProveedor}:`, error);
      throw error;
    }
  },

  // Eliminar un proveedor (para admin)
  deleteProveedor: async (idProveedor) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/proveedores/eliminar/${idProveedor}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de tener el token en localStorage
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el proveedor con ID ${idProveedor}:`, error);
      throw error;
    }
  },

  // ... otras funciones relacionadas con proveedores si es necesario ...
};

export default proveedorService;
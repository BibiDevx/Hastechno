// src/services/clientService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const clientService = {
  updateProfile: async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/clientes/actualizar/cuenta`,
        userData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el perfil del cliente:", error);
      throw error;
    }
  },

  deleteProfile: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.delete(`${API_BASE_URL}/clientes/eliminar/cuenta`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el perfil del cliente:", error);
      throw error;
    }
  },

  // Funciones para que los administradores gestionen clientes
  getAllClients: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.get(`${API_BASE_URL}/consumidores/clientes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
      throw error;
    }
  },

  getClientById: async (clientId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.get(`${API_BASE_URL}/consumidores/clientes/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el cliente con ID ${clientId}:`, error);
      throw error;
    }
  },

  updateClient: async (clientId, clientData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/consumidores/clientes/actualizar/${clientId}`,
        clientData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el cliente con ID ${clientId}:`, error);
      throw error;
    }
  },

  deleteClient: async (clientId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.delete(`${API_BASE_URL}/consumidores/clientes/eliminar/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el cliente con ID ${clientId}:`, error);
      throw error;
    }
  },
};

export default clientService;
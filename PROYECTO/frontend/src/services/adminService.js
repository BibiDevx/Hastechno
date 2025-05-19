// src/services/adminService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const adminService = {
  updateProfile: async (adminData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/actualizar/datos`,
        adminData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el perfil del administrador:", error);
      throw error;
    }
  },

  getAllAdmins: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista de administradores:", error);
      throw error;
    }
  },

  getAdminById: async (adminId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el administrador con ID ${adminId}:`, error);
      throw error;
    }
  },

  updateAdmin: async (adminId, adminData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/admin/${adminId}`,
        adminData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el administrador con ID ${adminId}:`, error);
      throw error;
    }
  },

  deleteAdmin: async (adminId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/admin/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el administrador con ID ${adminId}:`, error);
      throw error;
    }
  },
};

export default adminService;
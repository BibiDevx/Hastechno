import axios from 'axios';

// Define la URL base de tu API. Asegúrate de que coincida con tu configuración.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MarcaService = {
  async getAllMarcas() {
    try {
      const response = await axios.get(`${API_BASE_URL}/verMarcas`); // Ajustado a la ruta de lectura
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
      throw error; // Re-lanza el error para que el componente lo pueda manejar
    }
  },

  // Métodos para operaciones que requieren autenticación y rol de Admin:

  async createMarca(marcaData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/marcas/registrar`, marcaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear la marca:", error);
      throw error;
    }
  },

  async updateMarca(id, marcaData) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/marcas/actualizar/${id}`, marcaData);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la marca:", error);
      throw error;
    }
  },

  async deleteMarca(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/marcas/eliminar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la marca:", error);
      throw error;
    }
  },

  async getMarcaById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/verMarcas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la marca con ID ${id}:`, error);
      throw error;
    }
  },
};

export default MarcaService;
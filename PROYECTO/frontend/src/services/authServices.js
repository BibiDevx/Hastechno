// src/services/authServices.js
import axios from "axios";

// Importa la URL base de la API desde el archivo de configuración
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_AUTH_URL = `${API_BASE_URL}/auth`; // Define la ruta base para la autenticación

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });

    const { access_token, user } = response.data.data;

    // Guardamos el token y el usuario
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return { access_token, user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};

const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.post(
      `${API_AUTH_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; // Re-lanza el error
  }
};

const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null; // O podrías lanzar un error

  try {
    const response = await axios.get(`${API_AUTH_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error; // Re-lanza el error
  }
};

const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) return null; // O podrías lanzar un error

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/clientes/actualizar/cuenta`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw error; // Re-lanza el error
  }
};
const deleteProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/eliminar/cuenta`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Hubo un problema al eliminar el perfil"
      );
    }
    return response.json(); // O simplemente un response.ok si el backend no devuelve JSON al eliminar
  } catch (error) {
    console.error("Error al eliminar el perfil:", error);
    throw error;
  }
};

const authService = {
  // Asignamos el objeto a la variable 'authService'
  login,
  logout,
  getProfile,
  updateProfile,
  deleteProfile,
};

export default authService;

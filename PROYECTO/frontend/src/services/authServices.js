// src/services/authServices.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  const { access_token, user } = response.data.data;

  // Guardamos el token y el usuario
  localStorage.setItem("token", access_token);
  localStorage.setItem("user", JSON.stringify(user));

  return { access_token, user };
};

const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  await axios.post(`${API_URL}/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch("http://localhost:8000/api/clientes/actualizar/cuenta", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  login,
  logout,
  getProfile,
  updateProfile,
};

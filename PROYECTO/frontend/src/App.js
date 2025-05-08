import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";  // Importa el contexto de autenticación
import ClienteRoutes from "./routes/ClienteRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Navbar from "./components/Navbar";
import Perfil from "./components/Perfil";
import EditarPerfil from "./components/EditarPerfil";
import SidebarAdmin from "./components/SidebarAdmin";
import ProductInfo from "./components/ProductInfo";
import ProductosPorMarca from "./components/ProductosPorMarca"; // Importado para mostrar productos por marca

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const { usuario } = useAuth();  // Obtenemos el usuario desde el contexto
  const navigate = useNavigate();  // Usamos navigate para redirigir
  const location = useLocation();

  // Verificamos si el usuario está logueado y si es admin o cliente
  useEffect(() => {
    if (!usuario) return;  // Si no hay usuario, no hacer nada

    // Si el usuario es un admin y no está en una ruta de admin, lo redirigimos
    if (usuario.role === "admin" && !location.pathname.startsWith("/admin")) {
      navigate("/admin");  // Redirige al admin
    } 
    // Si el usuario es un cliente y está en una ruta de admin, lo redirigimos a perfil
    else if (usuario.role === "cliente" && location.pathname.startsWith("/admin")) {
      navigate("/perfil");  // Redirige al cliente a su perfil
    }
  }, [usuario, location, navigate]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="d-flex">
      {isAdminRoute && <SidebarAdmin />} {/* Sidebar solo para admin */}
      <div className="flex-grow-1">
        {!isAdminRoute ? <Navbar /> : null} {/* Navbar visible para cliente */}

        <Routes>
          {/* Rutas de cliente (home, productos, carrito, etc) */}
          <Route path="/*" element={<ClienteRoutes />} />

          {/* Perfil del cliente */}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />

          {/* Vista individual de un producto */}
          <Route path="/info/:idProducto" element={<ProductInfo />} />

          {/* Productos filtrados por marca */}
          <Route path="/productos/marca/:idMarca" element={<ProductosPorMarca />} />

          {/* Rutas de administración */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

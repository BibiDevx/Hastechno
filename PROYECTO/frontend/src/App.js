import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ClienteRoutes from "./routes/ClienteRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Navbar from "./components/client/Navbar";
import Perfil from "./components/client/Perfil";
import EditarPerfil from "./components/client/EditarPerfil";
import SidebarAdmin from "./components/admin/SidebarAdmin";
import ProductInfo from "./components/client/ProductInfo";
import ProductosPorMarca from "./components/client/ProductosPorMarca";  

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!usuario) return;

    const currentPath = location.pathname;

    if (usuario.rol === "Admin" && currentPath === "/admin") {
      navigate("/admin");
    } else if (usuario.rol === "Admin" && !currentPath.startsWith("/admin")) {
      navigate("/admin");
    } else if (usuario.rol === "SuperAdmin" && currentPath === "/superadmin") {
      navigate("/superadmin/dashboard");
    } else if (usuario.rol === "SuperAdmin" && !currentPath.startsWith("/superadmin")) {
      navigate("/superadmin");
    } else if (usuario.rol === "cliente" && currentPath.startsWith("/admin")) {
      navigate("/perfil");
    } else if (usuario.rol === "cliente" && currentPath.startsWith("/superadmin")) {
      navigate("/perfil");
    }
  }, [usuario, location, navigate]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isSuperAdminRoute = location.pathname.startsWith("/superadmin");

  return (
    <div className="d-flex">
      {(isAdminRoute || isSuperAdminRoute) && <SidebarAdmin />}
      <div className="flex-grow-1">
        {!(isAdminRoute || isSuperAdminRoute) ? <Navbar /> : null}
        <Routes>
          {/* Rutas de administración */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* Rutas de superadministración */}
          <Route path="/superadmin/*" element={<AdminRoutes />} /> {/* Asumiendo que AdminRoutes sirve también para SuperAdmin */}
          {/* Rutas de cliente */}
          <Route path="/*" element={<ClienteRoutes />} />
          {/* Rutas específicas */}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/info/:idProducto" element={<ProductInfo />} />
          <Route path="/productos/marca/:idMarca" element={<ProductosPorMarca />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import ProductosAdmin from "../pages/admin/ProductosAdmin";
import PedidosAdmin from "../pages/admin/PedidosAdmin";
import UsuariosAdmin from "../pages/admin/UsuariosAdmin";
import MarcasAdmin from "../pages/admin/MarcasAdmin";
import CategoriasAdmin from "../pages/admin/CategoriasAdmin";
import ConfiguracionAdmin from "../pages/admin/ConfiguracionAdmin";
import PerfilAdmin from "../pages/admin/PerfilAdmin";
import ClienteRoutes from "./ClienteRoutes"; // Importa las rutas de cliente

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/productos" element={<ProductosAdmin />} />
      <Route path="/pedidos" element={<PedidosAdmin />} />
      <Route path="/usuarios" element={<UsuariosAdmin />} />
      <Route path="/marcas" element={<MarcasAdmin />} />
      <Route path="/categorias" element={<CategoriasAdmin />} />
      <Route path="/configuracion" element={<ConfiguracionAdmin />} />
      <Route path="/perfil" element={<PerfilAdmin />} />

      {/* Nueva Ruta: Vista de Prueba */}
      <Route path="/prueba/*" element={<ClienteRoutes modoPrueba={true} />} />
    </Routes>
  );
}

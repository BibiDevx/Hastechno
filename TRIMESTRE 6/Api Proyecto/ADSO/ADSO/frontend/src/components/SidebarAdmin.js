import { Link } from "react-router-dom";
import { useState } from "react";

export default function SidebarAdmin() {
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  const [isConfiguracionOpen, setIsConfiguracionOpen] = useState(false);
  const [isPedidosOpen, setIsPedidosOpen] = useState(false); // Agregamos estado para la sección Pedidos

  const toggleGestion = () => setIsGestionOpen(!isGestionOpen);
  const toggleConfiguracion = () => setIsConfiguracionOpen(!isConfiguracionOpen);
  const togglePedidos = () => setIsPedidosOpen(!isPedidosOpen); // Función para manejar el toggle de Pedidos

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white min-vh-100" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">Admin Panel</h4>
      <h5 className="text-white"><Link className="nav-link text-white" to="/admin/">Dashboard</Link></h5>  
      <ul className="nav flex-column">
        {/* Sección de Gestión */}
        <h5 className="text-white" onClick={toggleGestion} style={{ cursor: "pointer" }}>
          Gestión <i className={`bi ${isGestionOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </h5>
        <div className={`collapse ${isGestionOpen ? "show" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/marcas">Marcas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/categorias">Categorías</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/usuarios">Usuarios</Link>
          </li>
        </div>

        {/* Sección de Pedidos */}
        <h5 className="text-white mt-4" onClick={togglePedidos} style={{ cursor: "pointer" }}>
          Pedidos <i className={`bi ${isPedidosOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </h5>
        <div className={`collapse ${isPedidosOpen ? "show" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/pedidos">Pedidos</Link>
          </li>
        </div>

        {/* Sección de Configuración */}
        <h5 className="text-white mt-4" onClick={toggleConfiguracion} style={{ cursor: "pointer" }}>
          Configuración <i className={`bi ${isConfiguracionOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </h5>
        <div className={`collapse ${isConfiguracionOpen ? "show" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/configuracion">Configuración</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/perfil">Perfil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/prueba">Modo Prueba</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Logout</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authServices from "../services/authServices"; // Importamos authServices

function Navbar() {
  const { usuario, setUsuario } = useAuth(); // Accedemos al usuario y la función setUsuario
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authServices.logout(); // Llamamos al servicio logout
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUsuario(null); // Limpiamos el estado del contexto
      navigate("/login"); // Redirigimos al login
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <strong>Hastechno</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarHeader">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/marcas" className="nav-link">Marcas</Link>
            </li>
          </ul>

          <Link to="/checkout" className="btn btn-success me-3 btn-sm">
            <i className="bi bi-cart-fill">
              <span id="num_cart" className="badge bg-secondary">0</span>
            </i>
          </Link>

          {usuario ? (
            <div className="dropdown">
              <button
                className="btn btn-success btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {usuario.nombre}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link to="/editar-perfil" className="dropdown-item">Editar Perfil</Link></li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-success btn-sm">
              <i className="bi bi-person-circle"> Login</i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

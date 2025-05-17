import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import authServices from "../services/authServices";

function Navbar() {
  const usuario = useSelector((state) => state.auth.usuario);
  const cartItems = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.cantidad || 1),
    0
  );

  const handleLogout = async () => {
    try {
      await authServices.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Hastechno
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

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarHeader"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/marcas" className="nav-link">
                Marcas
              </Link>
            </li>
          </ul>

          <Link
            to="/checkout"
            className="btn btn-outline-light me-3 btn-sm d-flex align-items-center position-relative"
            style={{
              minWidth: "120px",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
            }}
          >
            <i className="bi bi-cart-fill me-2"></i>
            <span className="text-white">Carrito</span>
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7em" }}
              >
                {cartCount}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link>

          {usuario ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  minWidth: "120px",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                }}
              >
                <i className="bi bi-person-fill me-2"></i>
                <span className="text-white">{usuario.nombre}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-light border-0 shadow-sm">
                <li>
                  <Link
                    to="/perfil"
                    className="dropdown-item text-secondary d-flex align-items-center"
                  >
                    <i className="bi bi-person me-2"></i> Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/editar-perfil"
                    className="dropdown-item text-secondary d-flex align-items-center"
                  >
                    <i className="bi bi-pencil me-2"></i> Editar Perfil
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-secondary d-flex align-items-center"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-light btn-sm d-flex align-items-center"
              style={{
                minWidth: "120px",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
              }}
            >
              <i className="bi bi-person-circle me-2"></i>
              <span className="text-white">Login</span>
            </Link>
          )}
        </div>
      </div>
      <style type="text/css">
        {`
          .btn-outline-light:hover {
            color: #f8f9fa !important;
            background-color:rgb(12, 79, 180) !important;
            border-color: #f8f9fa !important;
          }

          .dropdown-item:hover {
            background-color: #e9ecef !important; /* Gris claro de Bootstrap para el hover */
            color: #000 !important; /* Texto negro al pasar el ratón */
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;

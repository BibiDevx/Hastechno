import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import authServices from "../../services/authServices";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, clearError } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(clearError());

    try {
      const { access_token, user } = await authServices.login(email, password);

      if (access_token && user) {
        dispatch(loginSuccess({ user, access_token }));
        navigate(user.rol === "Admin" || user.rol === "SuperAdmin" ? "/admin" : "/perfil");
      } else {
        setError("Credenciales inválidas o no se recibió información del usuario.");
        dispatch(loginFailure("Credenciales inválidas o no se recibió información del usuario."));
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      dispatch(loginFailure("Usuario o contraseña incorrectos"));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}> {/* Centrar y limitar ancho */}
      <div className="row justify-content-center">
        <div className="col-md-12"> {/* Ocupar todo el ancho del contenedor */}
          <div className="card shadow p-4 border-0 rounded-lg"> {/* Tarjeta con sombra y sin bordes */}
            <h2 className="text-center mb-4 text-primary fw-bold">Iniciar Sesión</h2> {/* Título centrado y con estilo */}
            {error && <div className="alert alert-danger mb-3">{error}</div>} {/* Alerta de error */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label> {/* Etiqueta seminegrita */}
                <input
                  type="email"
                  className="form-control form-control-lg" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Contraseña</label> {/* Etiqueta seminegrita */}
                <input
                  type="password"
                  className="form-control form-control-lg" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold"> {/* Botón primario ancho y redondeado */}
                Ingresar
              </button>
            </form>
            <div className="mt-3 text-center">
              <Link to="/recuperar" className="text-muted">¿Olvidaste tu contraseña?</Link> {/* Enlace con estilo */}
            </div>
            <div className="mt-2 text-center">
              ¿No tienes cuenta? <Link to="/registro" className="text-primary fw-semibold">Regístrate aquí</Link> {/* Enlace con estilo */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUsuario } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { access_token, user } = await authServices.login(email, password);

      if (access_token) {
        setUsuario(user);
        navigate(user.role === "admin" ? "/admin" : "/perfil");
      } else {
        setError("No se recibió un token");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
          </form>
          <div className="mt-3 text-center">
            <a href="/recuperar">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="mt-2 text-center">
            ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

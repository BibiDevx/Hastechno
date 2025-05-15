import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { loginSuccess, loginFailure, clearError } from "../../redux/authSlice"; // Importa las acciones de Redux

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Obtén la función dispatch

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(clearError()); // Limpia cualquier error previo en el estado de Redux

    try {
      const { access_token, user } = await authServices.login(email, password);

      if (access_token && user) { // Asegúrate de que 'user' también exista
        dispatch(loginSuccess({ user, access_token })); // Despacha la acción con el 'user' recibido
        navigate(user.rol === "Admin" ? "/admin" : "/perfil");
      }else if (user.rol === "SuperAdmin") {
          navigate("/superadmin"); // 👈 Redirige a SuperAdmin
        } else {
        setError("Credenciales inválidas o no se recibió información del usuario.");
        dispatch(loginFailure("Credenciales inválidas o no se recibió información del usuario."));
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      dispatch(loginFailure("Usuario o contraseña incorrectos")); // Despacha la acción de fallo
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
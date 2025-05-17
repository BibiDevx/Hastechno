import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import "bootstrap/dist/css/bootstrap.min.css";

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    cedulaCliente: "",
    direccion: "",
    telefonoCliente: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await authServices.getProfile();
        const user = response.data;

        if (user.cliente) {
          setFormData({
            nombreCliente: user.cliente.nombreCliente || "",
            apellidoCliente: user.cliente.apellidoCliente || "",
            cedulaCliente: user.cliente.cedulaCliente || "",
            direccion: user.cliente.direccion || "",
            telefonoCliente: user.cliente.telefonoCliente || "",
            email: user.email || "",
            password: "",
            c_password: "",
          });
        }
      } catch (err) {
        setError("No se pudo cargar el perfil para editar.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.c_password) {
      return setError("Las contraseñas no coinciden.");
    }

    try {
      await authServices.updateProfile(formData);
      alert("Perfil actualizado correctamente.");
      navigate("/perfil");
    } catch (err) {
      setError("Error al actualizar el perfil.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando datos del perfil...</span>
        </div>
        <p className="mt-2 text-muted">Cargando información para editar...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold text-primary">Editar tu Perfil</h2>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-lg">
            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label fw-semibold">Nombres</label>
              <input
                type="text"
                name="nombreCliente"
                className="form-control rounded-pill"
                id="nombreCliente"
                value={formData.nombreCliente}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellidoCliente" className="form-label fw-semibold">Apellidos</label>
              <input
                type="text"
                name="apellidoCliente"
                className="form-control rounded-pill"
                id="apellidoCliente"
                value={formData.apellidoCliente}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cedulaCliente" className="form-label fw-semibold">Cédula</label>
              <input
                type="number"
                name="cedulaCliente"
                className="form-control rounded-pill"
                id="cedulaCliente"
                value={formData.cedulaCliente}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control rounded-pill"
                id="email"
                value={formData.email}
                onChange={handleChange}
                readOnly // Opcional: si no quieres que el usuario cambie el email aquí
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label fw-semibold">Dirección</label>
              <input
                type="text"
                name="direccion"
                className="form-control rounded-pill"
                id="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefonoCliente" className="form-label fw-semibold">Teléfono</label>
              <input
                type="tel"
                name="telefonoCliente"
                className="form-control rounded-pill"
                id="telefonoCliente"
                value={formData.telefonoCliente}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Nueva Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control rounded-pill"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Opcional: ingresa para cambiar"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="c_password" className="form-label fw-semibold">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                name="c_password"
                className="form-control rounded-pill"
                id="c_password"
                value={formData.c_password}
                onChange={handleChange}
                placeholder="Opcional: repite la nueva contraseña"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
              <i className="bi bi-save-fill me-2"></i> Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;
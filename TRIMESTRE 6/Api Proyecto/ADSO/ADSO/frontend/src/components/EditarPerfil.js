import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    cedulaCliente: "",
    direccion: "",
    telefonoCliente: "",
    email: "",
    password: "",
    c_password: "", // nuevo campo agregado
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authServices.getProfile();
        const user = response.data;

        if (user.cliente) {
          setFormData({
            nombreCliente: user.cliente.nombreCliente,
            apellidoCliente: user.cliente.apellidoCliente,
            cedulaCliente: user.cliente.cedulaCliente,
            direccion: user.cliente.direccion,
            telefonoCliente: user.cliente.telefonoCliente,
            email: user.email,
            password: "",
            c_password: "", // inicializar
          });
        }
      } catch (err) {
        setError("No se pudo cargar el perfil");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación local: contraseñas deben coincidir si hay cambio
    if (formData.password && formData.password !== formData.c_password) {
      return setError("Las contraseñas no coinciden");
    }

    try {
      await authServices.updateProfile(formData);
      alert("Perfil actualizado correctamente");
      navigate("/perfil");
    } catch (err) {
      setError("Error al actualizar el perfil");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Editar Perfil</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nombres</label>
          <input
            type="text"
            name="nombreCliente"
            className="form-control"
            value={formData.nombreCliente}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellidos</label>
          <input
            type="text"
            name="apellidoCliente"
            className="form-control"
            value={formData.apellidoCliente}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cédula</label>
          <input
            type="number"
            name="cedulaCliente"
            className="form-control"
            value={formData.cedulaCliente}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefonoCliente"
            className="form-control"
            value={formData.telefonoCliente}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nueva Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Puede ser la que tienes o cambiarla"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            name="c_password"
            className="form-control"
            value={formData.c_password}
            onChange={handleChange}
            placeholder="Repite la nueva contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil;

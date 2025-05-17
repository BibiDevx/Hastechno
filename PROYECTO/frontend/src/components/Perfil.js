import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await authServices.getProfile();
        setUser(data.data);
        setError("");
      } catch (err) {
        setError(err.message || "No se pudo obtener el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/editar-perfil");
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        await authServices.deleteProfile(localStorage.getItem("token"));
        navigate("/login");
      } catch (error) {
        console.error("Error al eliminar el perfil:", error);
        alert(error.message || "Hubo un error al intentar eliminar el perfil.");
      }
    }
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!user) {
    return <p>No se ha encontrado información del usuario.</p>; // Mensaje más claro si no hay usuario
  }

  return (
    <div className="container mt-4">
      <h3>Perfil del Usuario</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <strong>Email:</strong> {user.email}
        </li>
        {user.cliente && (
          <>
            <li className="list-group-item">
              <strong>Nombre:</strong> {user.cliente.nombreCliente}
            </li>
            <li className="list-group-item">
              <strong>Apellido:</strong> {user.cliente.apellidoCliente}
            </li>
            <li className="list-group-item">
              <strong>Documento:</strong> {user.cliente.cedulaCliente}
            </li>
            <li className="list-group-item">
              <strong>Dirección:</strong> {user.cliente.direccion}
            </li>
            <li className="list-group-item">
              <strong>Teléfono:</strong> {user.cliente.telefonoCliente}
            </li>
          </>
        )}
        {user.admin && (
          <>
            <li className="list-group-item">
              <strong>Nombre:</strong> {user.admin.nombreAdmin}
            </li>
            <li className="list-group-item">
              <strong>Teléfono:</strong> {user.admin.telefonoAdmin}
            </li>
          </>
        )}
      </ul>

      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleEditClick}>
          Editar Perfil
        </button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Eliminar Perfil
        </button>
      </div>
    </div>
  );
};

export default Perfil;

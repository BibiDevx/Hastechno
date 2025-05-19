import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authService";
import clientService from "../../services/clientService"; // Importa clientService
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de tener Bootstrap instalado

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientProfile = async () => {
      setLoading(true);
      try {
        const data = await authServices.getProfile();
        setUser(data.data); // Asumiendo que la info del cliente está en data.data.cliente
        setError("");
      } catch (err) {
        setError(err.message || "No se pudo obtener el perfil del cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/editar-perfil"); // Ruta específica para editar el perfil del cliente
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        await clientService.deleteProfile(); // Usa clientService para clientes
        navigate("/login");
      } catch (error) {
        console.error("Error al eliminar el perfil:", error);
        alert(error.message || "Hubo un error al intentar eliminar el perfil.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando perfil...</span>
        </div>
        <p className="mt-2 text-muted">Cargando información del perfil...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-5"><p className="alert alert-danger">{error}</p></div>;
  }

  if (!user) {
    return <div className="container mt-5"><p className="text-muted">No se ha encontrado información del cliente.</p></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded-lg">
        <div className="card-header bg-primary text-white fw-bold">
          <i className="bi bi-person-fill me-2"></i> Tu Perfil
        </div>
        <div className="card-body p-4">
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Email:</strong>
              <span>{user.email}</span> {/* Asumiendo relación usuario */}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Nombre:</strong>
              <span>{user.cliente.nombreCliente}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Apellido:</strong>
              <span>{user.cliente.apellidoCliente}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Documento:</strong>
              <span>{user.cliente.cedulaCliente}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Dirección:</strong>
              <span>{user.cliente.direccion}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Teléfono:</strong>
              <span>{user.cliente.telefonoCliente}</span>
            </li>
            {/* ... más información del cliente ... */}
          </ul>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-primary rounded-pill fw-semibold" onClick={handleEditClick}>
              <i className="bi bi-pencil-fill me-2"></i> Editar Perfil
            </button>
            <button className="btn btn-danger rounded-pill fw-semibold" onClick={handleDeleteClick}>
              <i className="bi bi-trash-fill me-2"></i> Eliminar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
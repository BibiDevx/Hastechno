import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authService"; // Para obtener la información del perfil
import adminService from "../../services/adminService"; // Para operaciones específicas de admin
import "bootstrap/dist/css/bootstrap.min.css";

const PerfilAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      try {
        const data = await authServices.getProfile();
        setAdmin(data.data.admin); // Asumiendo que la info del admin está en data.data.admin
        setError("");
      } catch (err) {
        setError(err.message || "No se pudo obtener el perfil del administrador.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/editar-perfil-admin"); // Crea esta ruta
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este perfil de administrador? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        // Asumiendo que tienes una función para eliminar el propio perfil de admin
        await adminService.deleteProfile();
        navigate("/login"); // O a donde quieras redirigir después de la eliminación
      } catch (error) {
        console.error("Error al eliminar el perfil del administrador:", error);
        alert(error.message || "Hubo un error al intentar eliminar el perfil del administrador.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        {/* ... indicador de carga ... */}
      </div>
    );
  }

  if (error) {
    return <div className="container mt-5"><p className="alert alert-danger">{error}</p></div>;
  }

  if (!admin) {
    return <div className="container mt-5"><p className="text-muted">No se ha encontrado información del administrador.</p></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded-lg">
        <div className="card-header bg-secondary text-white fw-bold">
          <i className="bi bi-shield-fill me-2"></i> Perfil de Administrador
        </div>
        <div className="card-body p-4">
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Email:</strong>
              <span>{admin.usuario.email}</span> {/* Asumiendo relación usuario */}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Nombre:</strong>
              <span>{admin.nombreAdmin}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong className="text-secondary">Teléfono:</strong>
              <span>{admin.telefonoAdmin}</span>
            </li>
            {/* ... más información específica del administrador ... */}
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

export default PerfilAdmin;
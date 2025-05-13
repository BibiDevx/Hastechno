import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 para redireccionar
import authServices from "../services/authServices";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 Hook de navegación

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authServices.getProfile();
        setUser(data.data);
      } catch (err) {
        setError("No se pudo obtener el perfil.");
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/editar-perfil"); // 👈 ruta a la página de edición
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.");

    if (confirmDelete) {
        try {
            // Llamada a la API para eliminar el perfil
            const response = await fetch('http://localhost:8000/api/clientes/eliminar/cuenta', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de enviar el token JWT si es necesario
                }
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al eliminar el perfil');
            }

            // Si se elimina correctamente, redirigimos a la página de inicio o login
            navigate('/login');
        } catch (error) {
            console.error("Error al eliminar el perfil:", error);
            alert('Hubo un error al intentar eliminar el perfil.');
        }
    }
};


  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!user) {
    return <p>Cargando perfil...</p>;
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

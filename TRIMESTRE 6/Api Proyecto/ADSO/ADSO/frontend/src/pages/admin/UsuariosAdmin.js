import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UsuariosAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({ nombre: "", apellido: "", correo: "", telefono: "", cedula: "", direccion: "" });

  const handleShowModal = (type, user) => {
    setModalType(type);
    setUserType(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nombre: "", apellido: "", correo: "", telefono: "", cedula: "", direccion: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Administradores</h2>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal("agregar", "admin")}>Agregar Administrador</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan</td>
            <td>Pérez</td>
            <td>juan@example.com</td>
            <td>1234567890</td>
            <td>
              <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", "admin")}>Editar</button>
              <button className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <h2 className="mb-3 mt-5">Clientes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana</td>
            <td>Gómez</td>
            <td>12345678</td>
            <td>ana@example.com</td>
            <td>0987654321</td>
            <td>Calle 123</td>
            <td>
              <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", "cliente")}>Editar</button>
              <button className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType === "agregar" ? `Agregar ${userType === "admin" ? "Administrador" : "Cliente"}` : "Editar Usuario"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="number" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
                  </div>
                  {userType === "cliente" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Cédula</label>
                        <input type="number" className="form-control" name="cedula" value={formData.cedula} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} />
                      </div>
                    </>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="button" className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MarcasAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [marcas, setMarcas] = useState([
    { id: 1, nombre: "MSI", descripcion: "Marca de hardware" },
    { id: 2, nombre: "Kingston", descripcion: "Memorias y almacenamiento" }
  ]);

  const handleShowModal = (type, marca = null) => {
    setModalType(type);
    setSelectedMarca(marca);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMarca(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta marca?")) {
      setMarcas(marcas.filter(marca => marca.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administrar Marcas</h2>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal("agregar")}>Agregar Marca</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th> 
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", marca)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(marca.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType === "agregar" ? "Agregar Marca" : "Editar Marca"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" defaultValue={selectedMarca?.nombre || ""} />
                  </div>
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

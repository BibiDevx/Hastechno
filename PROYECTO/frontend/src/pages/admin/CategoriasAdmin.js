import React, { useState } from "react";

export default function CategoriasAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ nombre: "" });

  const categorias = [
    { id: 1, nombre: "Laptops" },
    { id: 2, nombre: "Componentes" },
    { id: 3, nombre: "Accesorios" }
  ];

  const handleShowModal = (type, category = { nombre: "" }) => {
    setModalType(type);
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      console.log("Categoría eliminada con ID:", id);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administrar Categorías</h2>
      
      <button className="btn btn-success mb-3" onClick={() => handleShowModal("agregar")}>Agregar Categoría</button>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", categoria)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(categoria.id)}>Eliminar</button>
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
                <h5 className="modal-title">{modalType === "agregar" ? "Agregar Categoría" : "Editar Categoría"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <label htmlFor="nombre" className="form-label">Nombre de la Categoría</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  value={selectedCategory.nombre}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, nombre: e.target.value })}
                />
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
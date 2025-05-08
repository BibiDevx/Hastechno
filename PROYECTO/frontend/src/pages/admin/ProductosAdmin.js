import React, { useState } from "react";

export default function ProductosAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [products, setProducts] = useState([
    { id: 1, nombre: "Producto Ejemplo", descripcion: "Descripción del producto", valor: 100, disponibilidad: "Disponible" }
  ]);

  const handleShowModal = (type, product = null) => {
    setModalType(type);
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleSave = () => {
    if (modalType === "editar" && editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else if (modalType === "agregar") {
      const newProduct = { ...editingProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administrar Productos</h2>
      
      {/* Barra de búsqueda y filtro */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Todos</option>
          <option value="categoria1">Categoría 1</option>
          <option value="categoria2">Categoría 2</option>
        </select>
      </div>

      <button className="btn btn-success mb-3" onClick={() => handleShowModal("agregar", { nombre: "", descripcion: "", valor: "", disponibilidad: "" })}>Agregar Producto</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>${product.valor}</td>
              <td>{product.disponibilidad}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", product)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
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
                <h5 className="modal-title">{modalType === "agregar" ? "Agregar Producto" : "Editar Producto"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={editingProduct?.nombre} onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={editingProduct?.descripcion} onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" className="form-control" value={editingProduct?.valor} onChange={(e) => setEditingProduct({ ...editingProduct, valor: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Disponibilidad</label>
                    <select className="form-select" value={editingProduct?.disponibilidad} onChange={(e) => setEditingProduct({ ...editingProduct, disponibilidad: e.target.value })}>
                      <option value="Disponible">Disponible</option>
                      <option value="Agotado">Agotado</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
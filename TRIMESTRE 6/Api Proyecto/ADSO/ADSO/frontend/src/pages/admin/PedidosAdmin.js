import React, { useState } from "react";

export default function PedidosAdmin() {
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [estado, setEstado] = useState("");

  const pedidos = [
    { id: 1, cliente: "Juan Pérez", total: "$200", estado: "Pendiente" },
    { id: 2, cliente: "Ana Gómez", total: "$350", estado: "Enviado" },
    { id: 3, cliente: "Carlos López", total: "$150", estado: "Entregado" },
  ];

  const handleShowDetails = (pedido) => {
    setSelectedPedido(pedido);
    setEstado(pedido.estado);
  };

  const handleCloseModal = () => setSelectedPedido(null);

  const handleChangeEstado = () => {
    console.log(`Pedido ${selectedPedido.id} actualizado a ${estado}`);
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administrar Pedidos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.total}</td>
              <td>{pedido.estado}</td>
              <td>
                <button
                  className="btn btn-primary"   
                  onClick={() => handleShowDetails(pedido)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPedido && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Pedido</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Cliente:</strong> {selectedPedido.cliente}</p>
                <p><strong>Total:</strong> {selectedPedido.total}</p>
                <p><strong>Estado:</strong></p>
                <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="button" className="btn btn-success" onClick={handleChangeEstado}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
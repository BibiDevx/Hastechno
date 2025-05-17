import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eliminarDelCarrito, actualizarCantidad } from "../../redux/cartSlice";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const userLoggedIn = isAuthenticated;

  const handleQuantityChange = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad >= 1) {
      dispatch(actualizarCantidad({ idProducto, nuevaCantidad }));
    }
  };

  const removeProduct = () => {
    dispatch(eliminarDelCarrito(productToDelete));
    setShowModal(false);
  };

  const total = cart.reduce((sum, item) => sum + item.valorProducto * item.cantidad, 0);

  const handleRealizarPago = () => {
    if (userLoggedIn) {
      navigate('/pago');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-primary">Resumen de tu Carrito</h2>
      <div className="table-responsive rounded-lg shadow-sm">
        <table className="table table-hover bg-white">
          <thead className="bg-light">
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4 text-muted">Tu carrito está vacío.</td></tr>
            ) : (
              cart.map(item => (
                <tr key={item.idProducto}>
                  <td>
                    <img
                      src={`/assets/img/productos/${item.idProducto}/principal.png`}
                      alt={item.nombreProducto}
                      className="img-thumbnail rounded"
                      style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                  </td>
                  <td className="align-middle fw-semibold">{item.nombreProducto}</td>
                  <td className="align-middle text-secondary">${item.valorProducto.toLocaleString()}</td>
                  <td className="align-middle">
                    <input
                      type="number"
                      min="1"
                      className="form-control form-control-sm"
                      style={{ width: 80 }}
                      value={item.cantidad}
                      onChange={(e) => handleQuantityChange(item.idProducto, parseInt(e.target.value))}
                    />
                  </td>
                  <td className="align-middle fw-semibold">${(item.valorProducto * item.cantidad).toLocaleString()}</td>
                  <td className="align-middle">
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill"
                      onClick={() => { setProductToDelete(item.idProducto); setShowModal(true); }}
                    >
                      <i className="bi bi-trash-fill"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {cart.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end fw-bold">Total:</td>
                <td className="fw-bold text-primary">${total.toLocaleString()}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="6" className="text-end">
                  <Button variant="primary" size="lg" className="rounded-pill fw-semibold" onClick={handleRealizarPago}>
                    <i className="bi bi-credit-card-fill me-2"></i> Realizar Pago
                  </Button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Modal para eliminar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold"><i className="bi bi-exclamation-triangle-fill me-2"></i> Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto del carrito?
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button variant="secondary" className="rounded-pill fw-semibold" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="danger" className="rounded-pill fw-semibold" onClick={removeProduct}>
            <i className="bi bi-trash-fill me-1"></i> Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;
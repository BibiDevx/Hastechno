import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eliminarDelCarrito, actualizarCantidad } from "../../redux/cartSlice";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 👈 Accede al estado de autenticación de Redux
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const userLoggedIn = isAuthenticated; // Usa el estado de Redux para verificar si el usuario está logueado

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
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
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
              <tr><td colSpan="6" className="text-center">Carrito vacío</td></tr>
            ) : (
              cart.map(item => (
                <tr key={item.idProducto}>
                  <td><img src={`/assets/img/productos/${item.idProducto}/principal.png`} alt={item.nombreProducto} className="img-thumbnail" style={{ width: 80 }} /></td>
                  <td>{item.nombreProducto}</td>
                  <td>${item.valorProducto.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => handleQuantityChange(item.idProducto, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${(item.valorProducto * item.cantidad).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => { setProductToDelete(item.idProducto); setShowModal(true); }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h4 className="text-end">Total: ${total.toLocaleString()}</h4>
      <div className="d-grid gap-2 col-md-5 offset-md-7">
        <Button variant="primary" size="lg" onClick={handleRealizarPago}>Realizar pago</Button>
      </div>

      {/* Modal para eliminar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar el producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="danger" onClick={removeProduct}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;
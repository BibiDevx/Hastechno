import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PaginaPago() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Realizar Pago</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            
            {/* Resumen del Pedido */}
            <h4 className="mb-3">Resumen del Pedido</h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Producto 1</span>
                <strong>$50.00</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Producto 2</span>
                <strong>$30.00</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-light">
                <strong>Total</strong>
                <strong>$80.00</strong>
              </li>
            </ul>
            
            {/* Detalles del Cliente */}
            <h4 className="mb-3">Detalles del Cliente</h4>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Correo:</strong> juanperez@example.com</p>
            <p><strong>Dirección:</strong> Calle 123, Ciudad</p>
            <p><strong>Teléfono:</strong> 123456789</p>
            
            {/* Selección del Medio de Pago */}
            <h4 className="mb-3">Método de Pago</h4>
            <select className="form-select mb-3">
              <option>Selecciona un método de pago</option>
              <option>Tarjeta de Crédito/Débito</option>
              <option>PayPal</option>
              <option>Transferencia Bancaria</option>
            </select>
            
            {/* Botón para Confirmar Pago */}
            <button className="btn btn-primary w-100">Confirmar Pago</button>
          </div>
        </div>
      </div>
    </div>
  );
}       
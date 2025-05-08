import React from "react";
export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <div className="row">
        {/* Tarjetas de resumen */}
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Ventas</h5>
              <p className="card-text">$25,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Pedidos</h5>
              <p className="card-text">120</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">350</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Stock Bajo</h5>
              <p className="card-text">8 productos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de gráficos (puedes reemplazar con gráficos reales) */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Gráfico de Ventas</h5>
            <div className="bg-light" style={{ height: "200px" }}>
              <p className="text-center text-muted">[Aquí irá un gráfico]</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Gráfico de Pedidos</h5>
            <div className="bg-light" style={{ height: "200px" }}>
              <p className="text-center text-muted">[Aquí irá otro gráfico]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

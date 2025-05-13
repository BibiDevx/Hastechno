import React, { useState } from "react";

export default function ConfiguracionAdmin() {
  const [config, setConfig] = useState({
    nombreTienda: "Mi Tienda",
    logo: "",
    contacto: "contacto@mitienda.com",
    metodosPago: {
      paypal: true,
      tarjeta: true,
      transferencia: false,
    },
    tarifaEnvio: "5.00",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMetodoPagoChange = (metodo) => {
    setConfig((prev) => ({
      ...prev,
      metodosPago: {
        ...prev.metodosPago,
        [metodo]: !prev.metodosPago[metodo],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Configuración guardada:", config);
    alert("Configuración guardada exitosamente.");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Configuración de la Tienda</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Tienda</label>
          <input
            type="text"
            className="form-control"
            name="nombreTienda"
            value={config.nombreTienda}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contacto</label>
          <input
            type="email"
            className="form-control"
            name="contacto"
            value={config.contacto}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Métodos de Pago</label>
          <div>
            <input
              type="checkbox"
              checked={config.metodosPago.paypal}
              onChange={() => handleMetodoPagoChange("paypal")}
            /> PayPal
          </div>
          <div>
            <input
              type="checkbox"
              checked={config.metodosPago.tarjeta}
              onChange={() => handleMetodoPagoChange("tarjeta")}
            /> Tarjeta de Crédito
          </div>
          <div>
            <input
              type="checkbox"
              checked={config.metodosPago.transferencia}
              onChange={() => handleMetodoPagoChange("transferencia")}
            /> Transferencia Bancaria
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Tarifa de Envío ($)</label>
          <input
            type="number"
            className="form-control"
            name="tarifaEnvio"
            value={config.tarifaEnvio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Guardar Configuración</button>
      </form>
    </div>
  );
}

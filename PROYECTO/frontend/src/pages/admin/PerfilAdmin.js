import React from 'react';

export default function PerfilAdmin() {
  // Datos estáticos para el perfil
  const adminData = {
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@admin.com",
    telefono: "+1234567890",
  };

  return (
    <div className="container mt-4">
      <h2>Perfil del Administrador</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={adminData.nombre}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={adminData.apellido}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={adminData.correo}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            value={adminData.telefono}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña Actual</label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            value="********"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="nuevaContraseña"
            placeholder="Ingresa la nueva contraseña"
          />
        </div>

        <button type="button" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}

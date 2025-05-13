import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecuperarContrasena() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "28rem" }}>
        <h2 className="text-center mb-3">Recuperar Contraseña</h2>
        <p className="text-center text-muted mb-4">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="tuemail@example.com"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar Enlace
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">
            Volver al inicio de sesión
          </a>
        </div>
      </div>
    </div>
  );
}
    
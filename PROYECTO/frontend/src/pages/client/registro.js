import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RegistroCliente = () => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    email: "",
    direccion: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    fetch(`${API_BASE_URL}/auth/register/cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreCliente: form.nombres,
        apellidoCliente: form.apellidos,
        cedulaCliente: form.identificacion,
        telefonoCliente: form.telefono,
        direccion: form.direccion,
        email: form.email,
        password: form.password,
        c_password: form.confirmarPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMensaje("Registro exitoso. Ya puedes iniciar sesión.");
          setForm({
            nombres: "",
            apellidos: "",
            identificacion: "",
            email: "",
            direccion: "",
            telefono: "",
            password: "",
            confirmarPassword: "",
          });
        } else {
          setMensaje(data.message || "Error al registrar");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMensaje("Error de conexión con el servidor.");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}> {/* Centrar y limitar ancho */}
      <div className="row justify-content-center">
        <div className="col-md-10"> {/* Ocupar más ancho en pantallas medianas */}
          <div className="card shadow p-4 border-0 rounded-lg"> {/* Sin borde y esquinas redondeadas */}
            <h2 className="text-center mb-4 text-primary fw-bold">Crear Cuenta</h2> {/* Título primario y en negrita */}

            {mensaje && <div className={`alert ${mensaje.includes('exitoso') ? 'alert-success' : 'alert-danger'} mb-3`}>{mensaje}</div>} {/* Mensajes con colores */}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombres" className="form-label fw-semibold">Nombres</label> {/* Etiqueta seminegrita */}
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombres"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellidos" className="form-label fw-semibold">Apellidos</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="apellidos"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="identificacion" className="form-label fw-semibold">Número de Identificación</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="identificacion"
                  name="identificacion"
                  value={form.identificacion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label fw-semibold">Dirección</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label fw-semibold">Teléfono</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmarPassword" className="form-label fw-semibold">Repetir Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="confirmarPassword"
                  name="confirmarPassword"
                  value={form.confirmarPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold"> {/* Botón primario grande y redondeado */}
                  Registrar
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-muted small">¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p> {/* Enlace a inicio de sesión */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
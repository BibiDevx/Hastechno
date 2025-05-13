import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

    fetch("http://localhost:8000/api/auth/register/cliente", {
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
        c_password: form.confirmarPassword, // necesario para que el validador funcione
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Registro de Cliente</h2>

            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Número de Identificación</label>
                <input
                  type="number"
                  className="form-control"
                  name="identificacion"
                  value={form.identificacion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Repetir Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmarPassword"
                  value={form.confirmarPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;

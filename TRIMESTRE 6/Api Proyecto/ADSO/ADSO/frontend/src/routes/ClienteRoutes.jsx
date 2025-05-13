import { Routes, Route } from "react-router-dom";
import Home from "../pages/cliente/Home";
import Marcas from "../pages/cliente/Marcas";
import Checkout from "../pages/cliente/checkout";
import Productos from "../pages/cliente/Productos";
import RegistroCliente from "../pages/cliente/registro";
import RecuperacionCliente from "../pages/cliente/recuperar";
import Pago from "../pages/cliente/Pago";
import Login from "../pages/cliente/Login";

export default function ClienteRoutes({ modoPrueba = false }) {
  return (
    <div>
      {modoPrueba && <div className="alert alert-warning text-center">Estás en modo prueba</div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/registro" element={<RegistroCliente />} />
        <Route path="/recuperar" element={<RecuperacionCliente />} />
      </Routes>
    </div>
  );
}

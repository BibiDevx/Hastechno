import { Routes, Route } from "react-router-dom";
import Home from "../pages/client/Home";
import Marcas from "../pages/client/Marcas";
import Checkout from "../pages/client/checkout";
import Productos from "../pages/client/Productos";
import RegistroCliente from "../pages/client/registro";
import RecuperacionCliente from "../pages/client/recuperar";
import Pago from "../pages/client/Pago";
import Login from "../pages/client/Login";

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

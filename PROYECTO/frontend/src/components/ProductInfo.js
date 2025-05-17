import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { addToCart } from "../redux/cartSlice"; // Ajusta la ruta según tu estructura de archivos
import "bootstrap/dist/css/bootstrap.min.css";

// Importa la URL base de la API desde el archivo de configuración o variables de entorno
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ProductInfo = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const dispatch = useDispatch(); // Obtén la función dispatch

  useEffect(() => {
    fetch(`${API_BASE_URL}/verProductos/${idProducto}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducto(data.data);
        } else {
          console.error("Error al obtener producto:", data.message);
        }
      })
      .catch((error) => console.error("Error de red:", error));
  }, [idProducto]);

  const handleAddToCart = () => {
    if (producto) {
      dispatch(
        addToCart({
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          valorProducto: producto.valorProducto,
          cantidad: 1, // Puedes permitir al usuario cambiar la cantidad en otro lugar
        })
      );
      console.log(
        `Producto "${producto.nombreProducto}" con ID ${producto.idProducto} agregado al carrito desde la página de Info.`
      );
    }
  };

  if (!producto) {
    return (
      <div className="container mt-5">Cargando información del producto...</div>
    );
  }

  const imagePath = `/assets/img/productos/${producto.idProducto}/principal.png`;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6">
          <img
            src={imagePath}
            alt={producto.nombreProducto}
            className="img-fluid rounded"
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2>{producto.nombreProducto}</h2>
          <p className="text-muted">
            Marca:{" "}
            {producto.marca ? producto.marca.nombreMarca : "No disponible"}
          </p>
          <p className="text-muted">
            Categorías:{" "}
            {producto.categorias && producto.categorias.length > 0
              ? producto.categorias.map((c) => c.nombreCategoria).join(", ")
              : "No disponible"}
          </p>
          <h4 className="text">${producto.valorProducto.toLocaleString()}</h4>
          <p>{producto.definicion}</p>

          <button className="btn btn-primary" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

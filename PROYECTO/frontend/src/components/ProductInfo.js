import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductInfo = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/verProductos/${idProducto}`)
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

  if (!producto) {
    return <div className="container mt-5">Cargando información del producto...</div>;
  }

  const imagePath = `/assets/img/productos/${producto.idProducto}/principal.png`;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6">
          <img src={imagePath} alt={producto.nombreProducto} className="img-fluid rounded" />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2>{producto.nombreProducto}</h2>
          <p className="text-muted">
            Marca: {producto.marca ? producto.marca.nombreMarca : "No disponible"}
          </p>
          <p className="text-muted">
            Categorías: {producto.categorias && producto.categorias.length > 0
              ? producto.categorias.map((c) => c.nombreCategoria).join(", ")
              : "No disponible"}
          </p>
          <h4 className="text">${producto.valorProducto.toLocaleString()}</h4>
          <p>{producto.definicion}</p>

          <button className="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

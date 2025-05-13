import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductosPorMarca = () => {
  const { idMarca } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/verProductos/marcas/${idMarca}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("Error al cargar productos:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error de red:", error);
        setLoading(false);
      });
  }, [idMarca]);

  if (loading) {
    return <div className="text-center mt-5">Cargando productos...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos de la Marca</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((producto) => {
          // Ajusta esta ruta según cómo almacenas tus imágenes
          const imagenUrl = `/assets/img/productos/${producto.idProducto}/principal.png`;

          return (
            <div key={producto.idProducto} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={imagenUrl}
                  alt={producto.nombreProducto}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{producto.nombreProducto}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="card-text fw-bold">
                      ${producto.valorProducto.toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/info/${producto.idProducto}`)}
                    >
                      Info
                    </button>
                    <button className="btn btn-outline-primary">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductosPorMarca;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductosPorMarca = () => {
  const { idMarca } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_BASE_URL}/verProductos/marcas/${idMarca}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProductos(data.data);
        } else {
          console.error("Error al cargar productos:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error de red:", error);
        setLoading(false);
      });
  }, [idMarca]);

  const handleAddToCart = (producto) => {
    dispatch(
      addToCart({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        valorProducto: producto.valorProducto,
        cantidad: 1,
      })
    );
    console.log(`Producto "${producto.nombreProducto}" agregado al carrito.`);
  };

  if (loading) {
    return <div className="container mt-5 text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Productos de la Marca</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((producto) => {
          const imagenUrl = `/assets/img/productos/${producto.idProducto}/principal.png`;
          return (
            <div key={producto.idProducto} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-lg">
                <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: "220px" }}>
                  <img
                    src={imagenUrl}
                    alt={producto.nombreProducto}
                    className="img-fluid p-2"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between bg-white p-3">
                  <div>
                    <h5 className="card-title fw-bold text-truncate">{producto.nombreProducto}</h5>
                    <p className="card-text text-muted small">{producto.descripcion}</p>
                    <p className="card-text fw-bold mb-0">${producto.valorProducto.toLocaleString()}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className="btn btn-outline-info btn-sm rounded-pill fw-semibold"
                      onClick={() => navigate(`/info/${producto.idProducto}`)}
                    >
                      <i className="bi bi-info-circle me-1"></i> Info
                    </button>
                    <button
                      className="btn btn-primary btn-sm rounded-pill fw-semibold"
                      onClick={() => handleAddToCart(producto)}
                    >
                      <i className="bi bi-cart-plus-fill me-1"></i> Agregar
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
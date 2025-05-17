import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { addToCart } from "../redux/cartSlice"; // Ajusta la ruta según tu estructura de archivos

// Importa la URL base de la API desde el archivo de configuración o variables de entorno
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ProductosPorMarca = () => {
  const { idMarca } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Obtén la función dispatch

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
        cantidad: 1, // Puedes permitir al usuario cambiar la cantidad
      })
    );
    // Opcional: Puedes agregar una notificación o feedback al usuario
    console.log(`Producto "${producto.nombreProducto}" agregado al carrito.`);
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando productos...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos de la Marca</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((producto) => {
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
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleAddToCart(producto)} // Asocia la función al botón
                    >
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

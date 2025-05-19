import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import productService from '../../services/productService'; // Importa el servicio

const ProductInfo = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productService.getProductById(idProducto);
        if (data.success) {
          setProducto(data.data);
        } else {
          console.error("Error al obtener producto:", data.message);
          setError(data.message || 'Error al obtener la información del producto.');
        }
      } catch (error) {
        console.error("Error de red:", error);
        setError('Error de conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [idProducto]);

  const handleAddToCart = () => {
    if (producto) {
      dispatch(
        addToCart({
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          valorProducto: producto.valorProducto,
          cantidad: 1,
        })
      );
      console.log(
        `Producto "${producto.nombreProducto}" con ID ${producto.idProducto} agregado al carrito desde la página de Info.`
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando información del producto...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  if (!producto) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-muted">No se encontró el producto.</p>
      </div>
    );
  }

  const imagePath = `/assets/img/productos/${producto.idProducto}/principal.png`;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6 mb-4">
          <img
            src={imagePath}
            alt={producto.nombreProducto}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2 className="fw-bold  mb-3">{producto.nombreProducto}</h2>
          <p className="text-muted mb-2">
            Marca: <span className="fw-semibold">{producto.marca ? producto.marca.nombreMarca : "No disponible"}</span>
          </p>
          <p className="text-muted mb-2">
            Categorías:{" "}
            <span className="fw-semibold">
              {producto.categorias && producto.categorias.length > 0
                ? producto.categorias.map((c) => c.nombreCategoria).join(", ")
                : "No disponible"}
            </span>
          </p>
          <h4 className="fw-bold mb-3">${producto.valorProducto.toLocaleString()}</h4>
          <p className=" mb-4">{producto.definicion || "Descripción no disponible."}</p>

          <div className="d-flex gap-2 align-items-center">
            <button className="btn btn-primary rounded-pill fw-semibold" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus-fill me-1"></i> Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
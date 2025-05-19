import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import productService from '../../services/productService'; // Importa el servicio

const categories = [
  "TODOS",
  "BOARDS",
  "TECLADOS",
  "MOUSE",
  "PERIFERICOS",
  "MONITORES",
  "FUENTES",
  "ALMACENAMIENTO",
  "PROCESADORES",
  "MEMORIA RAM",
  "AMD",
  "INTEL",
  "TARJETA GRAFICA",
  "DISIPADORES",
  "CHASIS",
  "DIADEMAS",
  "MICROFONOS",
  "CAMARAS",
  "VENTILADORES",
];

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imagePath = `/assets/img/productos/${product.idProducto}/principal.png`;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        idProducto: product.idProducto,
        nombreProducto: product.nombreProducto,
        valorProducto: product.valorProducto,
        cantidad: 1,
      })
    );
    console.log(`Producto "${product.nombreProducto}" con ID ${product.idProducto} agregado al carrito.`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100 border-0 rounded-lg">
        <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: "220px" }}>
          <img
            src={imagePath}
            alt={product.nombreProducto}
            className="img-fluid p-2"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between bg-white p-3">
          <h5 className="card-title fw-bold text-truncate">{product.nombreProducto}</h5>
          <p className="card-text fw-bold">${product.valorProducto.toLocaleString()}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link
              to={`/info/${product.idProducto}`}
              className="btn btn-outline-info btn-sm rounded-pill fw-semibold"
            >
              <i className="bi bi-info-circle me-1"></i> Info
            </Link>
            <button
              className="btn btn-primary btn-sm rounded-pill fw-semibold"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus-fill me-1"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getAllAvailableProducts();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error al cargar productos:", data.message);
          setError(data.message || 'Error al cargar productos.');
        }
      } catch (err) {
        setError('Error de conexión con el servidor.');
        console.error("Error en fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "TODOS"
      ? products
      : products.filter((product) =>
          product.categorias.some(
            (categoria) => categoria.nombreCategoria === selectedCategory
          )
        );

  if (loading) {
    return <div className="container mt-4 text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filtros */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold text-secondary mb-3">Filtrar por Categoría</h5>
          <ul className="list-group shadow-sm rounded">
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item list-group-item-action ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: "pointer" }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Productos */}
        <div className="col-md-9">
          <h2 className="mb-4 fw-bold text-primary">
            {selectedCategory === "TODOS" ? "Todos los Productos" : selectedCategory}
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.idProducto} product={product} />
              ))
            ) : (
              <div className="col-12 text-center text-muted">
                <p>No hay productos en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
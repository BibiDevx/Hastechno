import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "../../redux/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <img
          src={imagePath}
          alt={product.nombreProducto}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{product.nombreProducto}</h5>
          <p className="card-text">${product.valorProducto.toLocaleString()}</p>
          <div className="d-flex justify-content-between">
            <a href={`/info/${product.idProducto}`} className="btn btn-primary">
              Info
            </a>
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(agregarAlCarrito(product))}
            >
              Agregar
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

  useEffect(() => {
    fetch("http://localhost:8000/api/verProductos/")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error al cargar productos:", data.message);
        }
      })
      .catch((err) => console.error("Error en fetch:", err));
  }, []);

  const filteredProducts =
    selectedCategory === "TODOS"
      ? products
      : products.filter((product) =>
          product.categorias.some(
            (categoria) => categoria.nombreCategoria === selectedCategory
          )
        );

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filtros */}
        <div className="col-md-3 mb-4">
          <h5>Categoría</h5>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item ${
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
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.idProducto} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

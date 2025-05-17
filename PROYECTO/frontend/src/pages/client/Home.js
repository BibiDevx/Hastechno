import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { addToCart } from "../../redux/cartSlice";

// Importa la URL base de la API desde el archivo de configuración o variables de entorno
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Card del producto
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
    console.log(
      `Producto "${product.nombreProducto}" con ID ${product.idProducto} agregado al carrito desde la Home.`
    );
  };

  return (
    <div className="col">
      <div className="card shadow-sm text-center h-100">
        {" "}
        {/* Añadimos text-center y h-100 */}
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          {/* Contenedor de imagen */}
          <img
            src={imagePath}
            alt={product.nombreProducto}
            className="p-3"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{product.nombreProducto}</h5>
          <p className="card-text">${product.valorProducto.toLocaleString()}</p>
          <div className="mt-3">
            <a href={`/info/${product.idProducto}`} className="btn btn-primary">
              Info
            </a>
            <button
              className="btn btn-outline-primary ms-3"
              onClick={handleAddToCart}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [productosRecientes, setProductosRecientes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/verProductos/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductosRecientes(data.data);
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div>
      {/* Slider */}
      <Carousel className="mt-3" interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/img/banner/banner1.png"
            alt="Oferta 1"
            style={{ height: "400px", width: "auto" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/img/banner/banner2.png"
            alt="Oferta 2"
            style={{ height: "400px", width: "auto" }}
          />
          <Carousel.Caption>
            <h3>Procesadores de Última Generación</h3>
            <p>Consigue los nuevos Ryzen e Intel.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Productos Nuevos */}
      <div className="container mt-4">
        <h2 className="text-center">Productos Nuevos</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productosRecientes.length > 0 ? (
            productosRecientes.map((product) => (
              <ProductCard key={product.idProducto} product={product} />
            ))
          ) : (
            <p className="text-center">Cargando productos...</p>
          )}
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Novedades del Mundo Tech</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <img
                src="/assets/img/novedad/noticia1.png"
                className="card-img-top"
                alt="Noticia 1"
              />
              <div className="card-body">
                <h5 className="card-title">NVIDIA lanza nueva RTX 5090</h5>
                <p className="card-text">
                  La nueva generación promete duplicar el rendimiento respecto a
                  la 4090.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img
                src="/assets/img/novedad/noticia2.png"
                className="card-img-top"
                alt="Noticia 2"
              />
              <div className="card-body">
                <h5 className="card-title">AMD presenta Ryzen 9000</h5>
                <p className="card-text">
                  Con una arquitectura mejorada y consumo energético más
                  eficiente.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img
                src="/assets/img/novedad/noticia3.png"
                className="card-img-top"
                alt="Noticia 3"
              />
              <div className="card-body">
                <h5 className="card-title">Intel apuesta por chips híbridos</h5>
                <p className="card-text">
                  Los nuevos procesadores fusionan eficiencia y potencia para
                  laptops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-light text-center p-3 mt-4">
        <p>© 2025 PC Componentes | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default HomePage;

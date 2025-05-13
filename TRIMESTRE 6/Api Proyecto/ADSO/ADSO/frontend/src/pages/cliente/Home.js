import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

// Card del producto
const ProductCard = ({ product }) => {
  const imagePath = `/assets/img/productos/${product.idProducto}/principal.png`; // Ajusta según tu estructura

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={imagePath}
          alt={product.nombreProducto}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{product.nombreProducto}</h5>
          <p className="card-text">${product.valorProducto.toLocaleString()}</p>
          <div className="d-flex justify-content-between align-items-center">
            <a href={`/info/${product.idProducto}`} className="btn btn-primary">
              Info
            </a>
            <button className="btn btn-outline-primary">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [productosRecientes, setProductosRecientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/verProductos/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductosRecientes(data.data); //  Aquí solo pasamos el array
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

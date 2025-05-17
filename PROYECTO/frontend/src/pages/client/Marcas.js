import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BrandCard = ({ brand }) => {
  const navigate = useNavigate();
  const logoUrl = `/assets/img/marcas/${brand.idMarca}.png`;

  const handleViewProducts = () => {
    navigate(`/productos/marca/${brand.idMarca}`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm text-center h-100 border-0 rounded-lg">
        <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: "180px" }}>
          <img
            src={logoUrl}
            alt={brand.nombreMarca}
            className="img-fluid p-2"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between bg-white p-3">
          <h5 className="card-title fw-bold text-truncate">{brand.nombreMarca}</h5>
          <button onClick={handleViewProducts} className="btn btn-outline-primary btn-sm rounded-pill fw-semibold mt-3">
            <i className="bi bi-eye-fill me-1"></i> Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/verMarcas`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBrands(data.data);
        } else {
          console.error("Error al cargar marcas:", data.message);
        }
      })
      .catch((error) => console.error("Error de red:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Explora Nuestras Marcas</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {brands.map((brand) => (
          <BrandCard key={brand.idMarca} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
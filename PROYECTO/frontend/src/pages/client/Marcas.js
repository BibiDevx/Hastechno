import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// Importa la URL base de la API desde el archivo de configuración o variables de entorno
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Componente para cada tarjeta de marca
const BrandCard = ({ brand }) => {
  const navigate = useNavigate();
  const logoUrl = `/assets/img/marcas/${brand.idMarca}.png`;

  const handleViewProducts = () => {
    // Redirigir a la página de productos de la marca
    navigate(`/productos/marca/${brand.idMarca}`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm text-center h-100">
        <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={logoUrl}
            alt={brand.nombreMarca}
            className="p-3"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{brand.nombreMarca}</h5>
          <button onClick={handleViewProducts} className="btn btn-primary mt-3">
            Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

// Página principal de marcas
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nuestras Marcas</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {brands.map((brand) => (
          <BrandCard key={brand.idMarca} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
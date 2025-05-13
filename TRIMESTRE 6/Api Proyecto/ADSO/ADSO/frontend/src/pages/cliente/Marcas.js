import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BrandCard = ({ brand }) => {
  const logoUrl = `/assets/img/marcas/${brand.idMarca}.png`; // Asegúrate que este path coincide con tu estructura

  return (
    <div className="col">
      <div className="card shadow-sm text-center h-100">
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={logoUrl}
            alt={brand.nombreMarca}
            className="p-3"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{brand.nombreMarca}</h5>
          <a href={`/productos/marca/${brand.idMarca}`} className="btn btn-primary mt-3">
            Ver Productos
          </a>
        </div>
      </div>
    </div>
  );
};

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/verMarcas")
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

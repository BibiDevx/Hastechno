import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import marcaService from "../../services/marcaService";
import proveedorService from "../../services/proveedorService";
import "bootstrap/dist/css/bootstrap.min.css";

// Definición de las categorías para el filtro
const CATEGORIES = [
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

const ProductosAdmin = () => {
  // Estados del componente
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [editingProduct, setEditingProduct] = useState({
    nombreProducto: "",
    definicion: "",
    valorProducto: "",
    disponibilidad: true,
    idMarca: "",
    idProveedor: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    fetchProducts();
    fetchMarcas();
    fetchProveedores();
  }, []);

  // Función para cargar la lista de marcas
  const fetchMarcas = async () => {
    try {
      const { data } = await marcaService.getAllMarcas();
      setMarcas(data);
    } catch (err) {
      console.error("Error al cargar las marcas:", err);
      setError("Error al cargar las marcas.");
    }
  };

  // Función para cargar la lista de proveedores
  const fetchProveedores = async () => {
    try {
      const { data } = await proveedorService.getAllProveedores();
      setProveedores(data);
    } catch (err) {
      console.error("Error al cargar los proveedores:", err);
      setError("Error al cargar los proveedores.");
    }
  };

  // Función para cargar la lista de productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getAllProductsWithDetailsForAdmin();
      setProducts(data);
      setError("");
    } catch (err) {
      console.error("Error al cargar los productos:", err);
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  // Función para mostrar el modal (agregar o editar)
  const handleShowModal = (type, product = null) => {
    setModalType(type);
    setEditingProduct(product ? { ...product } : { nombreProducto: "", definicion: "", valorProducto: "", disponibilidad: true, idMarca: "", idProveedor: "" });
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct({ nombreProducto: "", definicion: "", valorProducto: "", disponibilidad: true, idMarca: "", idProveedor: "" });
    setError("");
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        setError("Error al eliminar el producto.");
      }
    }
  };

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "disponibilidad" ? value === "Disponible" : value;
    setEditingProduct({ ...editingProduct, [name]: processedValue });
  };

  // Función para guardar (crear o editar) un producto
  const handleSave = async () => {
    try {
      if (modalType === "editar" && editingProduct.idProducto) {
        await productService.updateProduct(editingProduct.idProducto, editingProduct);
        alert("Producto actualizado correctamente.");
      } else if (modalType === "agregar") {
        await productService.createProduct(editingProduct);
        alert("Producto agregado correctamente.");
      }
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError("Error al guardar el producto.");
    }
  };

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory === "TODOS"
    ? products
    : products.filter(product =>
      product.categorias.some(categoria => categoria.nombreCategoria === selectedCategory)
    );

  // Renderizado condicional para el estado de carga y error
  if (loading || marcas.length === 0 || proveedores.length === 0) {
    return <div className="container mt-4">Cargando información...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administrar Productos</h2>

      <div className="d-flex justify-content-between mb-3">
        {/* Selector de categorías */}
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Botón para agregar un nuevo producto */}
        <button className="btn btn-success" onClick={() => handleShowModal("agregar")}>Agregar Producto</button>
      </div>

      {/* Tabla de productos */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Disponibilidad</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredProducts) ? (
            filteredProducts.map((product) => (
              <tr key={product.idProducto}>
                <td>{product.idProducto}</td>
                <td>{product.nombreProducto}</td>
                <td>{product.definicion}</td>
                <td>${product.valorProducto}</td>
                <td>
                  {product.disponibilidad ? "Disponible" : "Agotado"}
                </td>
                <td>{product.proveedor?.nombreProveedor}</td>
                <td>
                  {/* Botones de editar y eliminar */}
                  <button className="btn btn-primary me-2" onClick={() => handleShowModal("editar", product)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.idProducto)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {loading ? "Cargando productos..." : "No se encontraron productos."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para agregar/editar producto */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType === "agregar" ? "Agregar Producto" : "Editar Producto"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombreProducto" value={editingProduct.nombreProducto} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" name="definicion" value={editingProduct.definicion} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" className="form-control" name="valorProducto" value={editingProduct.valorProducto} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Disponibilidad</label>
                    <select className="form-select" name="disponibilidad" value={editingProduct.disponibilidad ? "Disponible" : "Agotado"} onChange={handleInputChange}>
                      <option value="Disponible">Disponible</option>
                      <option value="Agotado">Agotado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <select className="form-select" name="idMarca" value={editingProduct.idMarca} onChange={handleInputChange}>
                      <option value="">Seleccionar Marca</option>
                      {marcas.map(marca => (
                        <option key={marca.idMarca} value={marca.idMarca}>{marca.nombreMarca}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <select className="form-select" name="idProveedor" value={editingProduct.idProveedor} onChange={handleInputChange}>
                      <option value="">Seleccionar Proveedor</option>
                      {proveedores.map(proveedor => (
                        <option key={proveedor.idProveedor} value={proveedor.idProveedor}>{proveedor.nombreProveedor}</option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosAdmin;
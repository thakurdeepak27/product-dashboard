import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import "./Products.css";
import { ConfirmModal, ProductCard, ProductForm } from "../components";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // // Create or Update
  const handleSave = async (product) => {
    try {
      setSaving(true);

      if (product.id) {
        const updatedProduct = await updateProduct(product.id, product);

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, ...updatedProduct } : p,
          ),
        );
      } else {
        const newProduct = await createProduct(product);

        const productWithId = {
          ...newProduct,
          id: Date.now(),
        };

        setProducts((prevProducts) => [productWithId, ...prevProducts]);
      }

      setSelectedProduct(null);
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteProduct(productToDelete);

      setProducts(products.filter((p) => p.id !== productToDelete));

      setShowModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="products-page">
      {/* Form Section */}
      <div className="header-section">
        <h1 className="page-title">Product Management</h1>

        {!selectedProduct && (
          <button className="add-btn" onClick={() => setSelectedProduct({})}>
            + Add Product
          </button>
        )}
      </div>
      <div className="form-section">
        {selectedProduct !== null && (
          <div className="form-section">
            <ProductForm
              selectedProduct={selectedProduct}
              onSave={handleSave}
              onCancel={() => setSelectedProduct(null)}
              loading={saving}
            />
          </div>
        )}
      </div>

      {/* Status Handling */}
      {loading && <p className="status">Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {/* Product Grid */}
      <div className="products-grid">
        {!loading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setSelectedProduct}
              onDelete={handleDeleteClick}
            />
          ))}
      </div>
      {showModal && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          loading={deleting}
        />
      )}
    </div>
  );
};

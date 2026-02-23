import { Button } from "../commonComponents";
import "./ProductCard.css";

export const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-category">{product.category}</p>

        <p className="product-price">${product.price}</p>

        <p className="product-rating">
          ⭐ {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
        </p>
        <div className="product-actions">
          <Button onClick={() => onEdit(product)}>Edit</Button>

          <Button variant="danger" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

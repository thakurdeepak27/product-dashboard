import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input } from "../commonComponents";
import "./ProductForm.css";
import { validateProductField, validateProductForm } from "../../validations";

export const initialState = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

export const ProductForm = ({
  selectedProduct,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title ?? "",
        price: selectedProduct.price ?? "",
        description: selectedProduct.description ?? "",
        category: selectedProduct.category ?? "",
        image: selectedProduct.image ?? "",
      });
    } else {
      setFormData(initialState);
    }

    setErrors({});
    setTouched(false);

    if (selectedProduct) {
      setTimeout(() => {
        titleRef.current?.focus();
        titleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched(true);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateProductField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = useMemo(() => {
    const errors = validateProductForm(formData);

    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== "" && value !== null,
    );

    const noErrors = Object.keys(errors).length === 0;

    return allFieldsFilled && noErrors;
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSave({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{selectedProduct?.id ? "Update Product" : "Create Product"}</h2>

      <Input
        ref={titleRef}
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.title && <p className="form-error">{errors.title}</p>}

      <Input
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.price && <p className="form-error">{errors.price}</p>}

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.description && <p className="form-error">{errors.description}</p>}

      <Input
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.category && <p className="form-error">{errors.category}</p>}

      <Input
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.image && <p className="form-error">{errors.image}</p>}

      <div className="form-actions">
        <Button type="submit" disabled={loading || !touched || !isFormValid}>
          {loading ? "Saving..." : selectedProduct?.id ? "Update" : "Create"}
        </Button>

        {selectedProduct && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

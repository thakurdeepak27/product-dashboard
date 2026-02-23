export const validateProductField = (name, value) => {
  switch (name) {
    case "title":
      if (!value.trim()) return "Title is required";

      if (value.trim().length < 3) return "Title must be at least 3 characters";

      return "";

    case "price":
      if (value === "" || value === null) return "Price is required";

      if (isNaN(value)) return "Price must be a valid number";

      if (Number(value) <= 0) return "Price must be greater than 0";

      return "";

    case "description":
      if (!value.trim()) return "Description is required";

      if (value.trim().length < 10)
        return "Description must be at least 10 characters";

      return "";

    case "category":
      if (!value.trim()) return "Category is required";

      return "";

    case "image":
      if (!value.trim()) return "Image URL is required";

      try {
        new URL(value);
      } catch {
        return "Invalid URL format";
      }

      return "";

    default:
      return "";
  }
};

export const validateProductForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateProductField(key, formData[key]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

import React, { forwardRef } from "react";
import "./Input.css";

export const Input = forwardRef(
  (
    { label, name, value, onChange, type = "text", placeholder, disabled },
    ref,
  ) => {
    return (
      <div className="input-group">
        {label && <label htmlFor={name}>{label}</label>}

        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className="input"
          autoComplete="off"
        />
      </div>
    );
  },
);

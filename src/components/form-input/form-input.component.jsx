import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, value, id, ...otherProps }) => {
  const renderedLabel = label ? (
    <label
      className={`${value ? "shrink" : ""} form-input-label`}
      htmlFor={id || ""}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className="group">
      {renderedLabel}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;

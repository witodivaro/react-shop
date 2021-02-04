import React, { useMemo } from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, value, id, ...otherProps }) => {
  const renderedLabel = useMemo(
    () =>
      label ? (
        <label
          className={`${value ? "shrink" : ""} form-input-label`}
          htmlFor={id || ""}
        >
          {label}
        </label>
      ) : null,
    [label, id, value]
  );

  return (
    <div className="group">
      <input
        value={value}
        className="form-input"
        onChange={handleChange}
        {...otherProps}
      />
      {renderedLabel}
    </div>
  );
};

export default FormInput;

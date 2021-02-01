import React from "react";

import "./custom-input.styles.scss";

const CustomInput = ({ id, label, value, customMaxLength, ...otherProps }) => {
  const renderedLabel = label ? (
    <label
      htmlFor={id || ""}
      className={`input-label ${value ? "shrink" : ""}`}
    >
      {label}
    </label>
  ) : null;

  if (value.length > customMaxLength) {
    value = value.slice(0, customMaxLength);
  }

  return (
    <div className="custom-input">
      <input id={id || ""} value={value} {...otherProps} />
      {renderedLabel}
    </div>
  );
};

export default CustomInput;

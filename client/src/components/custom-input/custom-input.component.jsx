import React from "react";

import {
  InputLabelContainer,
  InputContainer,
  CustomInputContainer,
} from "./custom-input.styles";

const CustomInput = ({ id, label, value, customMaxLength, ...otherProps }) => {
  const renderedLabel = label ? (
    <InputLabelContainer htmlFor={id || ""} shrink={value}>
      {label}
    </InputLabelContainer>
  ) : null;

  if (value.length > customMaxLength) {
    value = value.slice(0, customMaxLength);
  }

  return (
    <CustomInputContainer>
      <InputContainer id={id || ""} value={value} {...otherProps} />
      {renderedLabel}
    </CustomInputContainer>
  );
};

export default CustomInput;

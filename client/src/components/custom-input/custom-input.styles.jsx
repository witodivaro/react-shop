import styled, { css } from "styled-components";

const shrinkLabelStyles = css`
  top: -12px;
  left: 0px;
  font-size: 12px;
`;

const getLabelStyles = (props) => {
  if (props.shrink) return shrinkLabelStyles;
};

export const CustomInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputLabelContainer = styled.label`
  position: absolute;
  top: 0;
  left: 5px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  transition: all 0.3s;

  ${getLabelStyles}
`;

export const InputContainer = styled.input`
  margin: 0;
  padding: 5px;
  width: 100%;

  background: none;
  outline: none;

  border: none;
  border-bottom: 1px solid #000;

  &:focus ~ ${InputLabelContainer} {
    ${shrinkLabelStyles}
  }

  &[disabled] {
    border-bottom: none;
  }
`;

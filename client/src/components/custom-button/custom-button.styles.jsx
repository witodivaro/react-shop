import styled, { css } from "styled-components";

const customButtonStyles = css`
  background-color: black;
  color: white;

  border: 1px solid transparent;

  &:hover {
    background-color: white;
    color: black;
    border-color: black;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: 1px solid transparent;

  &:hover {
    background-color: #357ae8;
    border-color: transparent;
  }
`;

const invertedStyles = css`
  color: black;
  background-color: #fff;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) return googleSignInStyles;
  if (props.inverted) return invertedStyles;
  return customButtonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  display: flex;
  justify-content: center;

  cursor: pointer;

  &[disabled] {
    border-color: red;
    border-width: 2px;
  }

  ${getButtonStyles}
`;

import styled from "styled-components";
import { CustomButtonContainer } from "../custom-button/custom-button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: #fff;
  top: 80px;
  right: 60px;
  z-index: 5;

  ${CustomButtonContainer} {
    margin-top: auto;
  }
`;

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const EmptyMessageContainer = styled.p`
  margin: 50px auto;

  font-size: 20px;
`;

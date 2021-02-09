import styled from "styled-components";
import { CustomButtonContainer } from "../custom-button/custom-button.styles";

export const AbsoluteCustomButtonContainer = styled(CustomButtonContainer)`
  position: absolute;
  top: 240px;

  width: 80%;

  display: none;
  opacity: 0.85;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
`;

export const CollectionFooterContainer = styled.div`
  margin-top: auto;

  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.span`
  width: 10%;
`;

export const CollectionItemContainer = styled.div`
  position: relative;
  width: 22%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  user-select: none;

  @media screen and (max-width: 800px) {
    width: 100%;
    margin-bottom: 10px;
    max-width: 300px;

    ${AbsoluteCustomButtonContainer} {
      display: block;
    }
  }

  &:hover {
    ${ImageContainer} {
      opacity: 0.8;
    }

    ${AbsoluteCustomButtonContainer} {
      display: block;
    }
  }
`;

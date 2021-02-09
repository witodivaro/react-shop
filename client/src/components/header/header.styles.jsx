import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuButtonContainer } from "../menu-button/menu-button.styles";

export const HeaderContainer = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  ${MenuButtonContainer} {
    display: none;

    @media screen and (max-width: 800px) {
      display: block;
    }
  }

  .cart-icon {
    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    height: auto;
    margin-bottom: 10px;
  }
`;

export const LogoContainer = styled(Link)`
  margin-right: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;

  @media screen and (max-width: 800px) {
    margin-right: 0;
  }
`;

export const MobileText = styled.span`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

export const OptionsContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 800px) {
    order: 3;
    width: 100%;
    font-size: 20px;
    flex-direction: column;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid black;
  }
`;

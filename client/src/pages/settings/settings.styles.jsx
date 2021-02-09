import styled from "styled-components";
import { CustomButtonContainer } from "../../components/custom-button/custom-button.styles";

export const SettingsPageContainer = styled.div`
  margin: 0 auto;

  max-width: 1360px;
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    max-width: 600px;
  }
`;

export const SettingsContainer = styled.div`
  display: grid;

  padding: 20px;

  width: 100%;
  background-color: rgb(240, 240, 240);
`;

export const SettingContainer = styled.div`
  margin-bottom: 10px;

  width: 100%;
  display: grid;
  align-items: center;
  grid-gap: 20px;
  grid-template-columns: 80px repeat(2, auto) 1fr;

  @media screen and (max-width: 800px) {
    grid-template-columns: auto;
  }

  ${CustomButtonContainer} {
    padding: 2px 10px;
    line-height: inherit;
    height: auto;
    min-width: 0;

    outline: none;
  }
`;

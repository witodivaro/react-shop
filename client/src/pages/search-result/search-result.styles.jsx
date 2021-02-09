import styled from "styled-components";
import { CollectionItemContainer } from "../../components/collection-item/collection-item.styles";

export const SearchResultContainer = styled.div`
  max-width: 1920px;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, 300px);
    justify-content: center;
  }

  ${CollectionItemContainer} {
    width: 100%;
  }
`;

export const TitleContainer = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-transform: uppercase;

  text-align: center;
`;

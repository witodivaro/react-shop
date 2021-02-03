import styled from "styled-components";
import { CollectionItemContainer } from "../../components/collection-item/collection-item.styles";

export const SearchResultContainer = styled.div`
  max-width: 1920px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  ${CollectionItemContainer} {
    width: 100%;
  }
`;

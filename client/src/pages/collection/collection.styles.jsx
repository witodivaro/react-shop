import styled from "styled-components";
import { CollectionItemContainer } from "../../components/collection-item/collection-item.styles";

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    justify-content: center;
  }

  & ${CollectionItemContainer} {
    margin-bottom: 30px;
    width: 100%;

    @media screen and (max-width: 800px) {
      justify-self: center;
    }
  }
`;

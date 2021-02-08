import styled from "styled-components";

import { CollectionItemContainer } from "../collection-item/collection-item.styles";

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  &:active {
    cursor: pointer;
  }
`;

export const TitleContainer = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;

  transition: transform 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.35);
  }
`;

export const ItemContainer = styled.div`
  padding: 0 5px;
  display: block;

  ${CollectionItemContainer} {
    width: 100%;

    @media screen and (max-width: 800px) {
      width: 320px;
      margin: 0 auto;
    }
  }
`;

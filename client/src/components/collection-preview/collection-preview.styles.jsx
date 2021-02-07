import styled from 'styled-components';

import { CollectionItemContainer } from '../collection-item/collection-item.styles';

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
`;

export const ItemContainer = styled.div`
  padding: 0 20px;
  display: block;

  ${CollectionItemContainer} {
    width: 100%;
  }
`;

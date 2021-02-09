import styled from "styled-components";

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

export const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

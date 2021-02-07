import React, { useMemo } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import {
  CollectionPageContainer,
  TitleContainer,
  ItemsContainer,
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { items, title } = collection;

  const renderedItems = useMemo(
    () =>
      items
        ? items.map((item) => <CollectionItem key={item.id} item={item} />)
        : [],
    [items]
  );

  return (
    <CollectionPageContainer>
      <TitleContainer>{title.toUpperCase()}</TitleContainer>
      <ItemsContainer>{renderedItems}</ItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;

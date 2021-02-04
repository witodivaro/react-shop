import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import {
  CollectionPageContainer,
  TitleContainer,
  ItemsContainer,
} from "./collection.styles";

const CollectionPage = ({ match }) => {
  const collection = useSelector((state) =>
    selectCollection(match.params.collectionId)(state)
  );

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

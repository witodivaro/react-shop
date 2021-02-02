import React, { useMemo } from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import {
  CollectionPageContainer,
  TitleContainer,
  ItemsContainer,
} from "./collection.styles";

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

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

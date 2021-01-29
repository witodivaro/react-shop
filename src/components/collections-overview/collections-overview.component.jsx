import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collections-overview.styles.scss";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectShopCollections } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => {
  const renderedCollections = collections.map((collection) => {
    const { id, title, items } = collection;
    return <CollectionPreview key={id} title={title} items={items} />;
  });

  return <div className="collections-overview">{renderedCollections}</div>;
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);

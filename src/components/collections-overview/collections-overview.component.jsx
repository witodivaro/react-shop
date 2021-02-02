import React, { useMemo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collections-overview.styles.scss";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => {
  const renderedCollections = useMemo(
    () =>
      collections.map((collection) => {
        const { id, title, items } = collection;
        return <CollectionPreview key={id} title={title} items={items} />;
      }),
    [collections]
  );

  return <div className="collections-overview">{renderedCollections}</div>;
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);

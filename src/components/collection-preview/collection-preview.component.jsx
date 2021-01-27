import React from "react";

import "./collection-preview.styles.scss";

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ title, items }) => {
  const renderedItems = items.slice(0, 4).map(({ id, ...itemParams }) => {
    return <CollectionItem key={id} {...itemParams}></CollectionItem>;
  });

  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">{renderedItems}</div>
    </div>
  );
};

export default CollectionPreview;

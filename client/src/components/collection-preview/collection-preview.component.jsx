import React, { useMemo } from "react";

import "./collection-preview.styles.scss";

import CollectionItem from "../collection-item/collection-item.component";

const ITEMS_AMOUNT_ON_PREVIEW = 4;

const CollectionPreview = ({ title, items }) => {
  const renderedItems = useMemo(() => {
    return items.slice(0, ITEMS_AMOUNT_ON_PREVIEW).map((item) => {
      return <CollectionItem key={item.id} item={item}></CollectionItem>;
    });
  }, [items]);

  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">{renderedItems}</div>
    </div>
  );
};

export default CollectionPreview;

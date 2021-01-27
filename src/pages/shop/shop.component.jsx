import React from "react";

import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const Shop = () => {
  const renderedCollections = SHOP_DATA.map((collection) => {
    const { id, title, items } = collection;
    return <CollectionPreview key={id} title={title} items={items} />;
  });

  return <div className="shop-page">{renderedCollections}</div>;
};

export default Shop;

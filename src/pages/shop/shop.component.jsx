import React, { useState } from "react";

import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const Shop = () => {
  const renderedCollections = SHOP_DATA.map((collection) => {
    const { items } = collection;
    return <CollectionPreview title={collection.title} items={items} />;
  });

  return (
    <div className="shop-page">
      Shop page
      {renderedCollections}
    </div>
  );
};

export default Shop;

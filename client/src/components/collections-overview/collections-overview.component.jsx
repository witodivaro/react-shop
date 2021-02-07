import React, { useMemo } from 'react';

import './collections-overview.styles.scss';

import CollectionPreview from '../collection-preview/collection-preview.component';

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

export default CollectionsOverview;

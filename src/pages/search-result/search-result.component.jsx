import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectItemsByFilter } from '../../redux/shop/shop.selectors';

import './search-result.styles.scss';

const SearchResultPage = ({ collectionItems }) => {
  const renderedItems = useMemo(() =>
    collectionItems.map((item) => <CollectionItem key={item.id} item={item} />)
  );

  return <div className="search-result">{renderedItems}</div>;
};

const mapStateToProps = createStructuredSelector({
  collectionItems: selectItemsByFilter,
});

export default connect(mapStateToProps)(SearchResultPage);

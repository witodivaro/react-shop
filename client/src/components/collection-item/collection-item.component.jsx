import React from 'react';
import { connect } from 'react-redux';

import { addCartItem } from '../../redux/cart/cart.actions';

import { cutStringByLength } from '../../utils/utils';

import {
  CollectionItemContainer,
  AbsoluteCustomButtonContainer,
  CollectionFooterContainer,
  ImageContainer,
  NameContainer,
  PriceContainer,
} from './collection-item.styles';

const MAX_NAME_LENGTH = 30;

const CollectionItem = ({ item, addCartItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemContainer>
      <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <NameContainer>
          {cutStringByLength(name, MAX_NAME_LENGTH)}
        </NameContainer>
        <PriceContainer>{price}$</PriceContainer>
      </CollectionFooterContainer>
      <AbsoluteCustomButtonContainer inverted onClick={() => addCartItem(item)}>
        Add to cart
      </AbsoluteCustomButtonContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (item) => dispatch(addCartItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(CollectionItem);

import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart } from '../../graphql/cart/cart.utils';
import { cartItemsVar } from '../../graphql/cart/cart.variables';

import { addCartItem } from '../../redux/cart/cart.actions';

import {
  CollectionItemContainer,
  AbsoluteCustomButtonContainer,
  CollectionFooterContainer,
  ImageContainer,
  NameContainer,
  PriceContainer,
} from './collection-item.styles';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const cartItems = useReactiveVar(cartItemsVar);

  return (
    <CollectionItemContainer>
      <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}$</PriceContainer>
      </CollectionFooterContainer>
      <AbsoluteCustomButtonContainer
        inverted
        onClick={() => cartItemsVar(addItemToCart(cartItems, item))}
      >
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

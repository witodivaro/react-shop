import React from 'react';
import { addItemToCart } from '../../graphql/cart/cart.mutations';

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

  return (
    <CollectionItemContainer>
      <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}$</PriceContainer>
      </CollectionFooterContainer>
      <AbsoluteCustomButtonContainer
        inverted
        onClick={() => addItemToCart(item)}
      >
        Add to cart
      </AbsoluteCustomButtonContainer>
    </CollectionItemContainer>
  );
};

export default CollectionItem;

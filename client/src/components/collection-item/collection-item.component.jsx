import React from "react";
import { useDispatch } from "react-redux";

import { addCartItem } from "../../redux/cart/cart.actions";

import { cutStringByLength } from "../../utils/utils";

import {
  CollectionItemContainer,
  AbsoluteCustomButtonContainer,
  CollectionFooterContainer,
  ImageContainer,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

const MAX_NAME_LENGTH = 30;

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();

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
      <AbsoluteCustomButtonContainer
        inverted
        onClick={() => dispatch(addCartItem(item))}
      >
        Add to cart
      </AbsoluteCustomButtonContainer>
    </CollectionItemContainer>
  );
};

export default CollectionItem;

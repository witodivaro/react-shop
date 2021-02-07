import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import {
  GET_CART_ITEMS,
  GET_CART_ITEMS_PRICE,
} from '../../graphql/cart/cart.queries';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import {
  TestWarningContainer,
  CheckoutHeaderContainer,
  CheckoutPageContainer,
  HeaderBlock,
  TotalContainer,
} from './checkout.styles';

const CheckoutPage = () => {
  const {
    data: { cartItems },
  } = useQuery(GET_CART_ITEMS);

  const {
    data: { cartItemsPrice },
  } = useQuery(GET_CART_ITEMS_PRICE);

  const renderedItems = useMemo(
    () =>
      cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      }),
    [cartItems]
  );

  const renderedWarning = useMemo(
    () =>
      cartItemsPrice ? (
        <TestWarningContainer>
          This payment is a testing feature, do not use ur real card.
          <br />
          Card info: 4242 4242 4242 4242 | future date | 3 random digits
        </TestWarningContainer>
      ) : null,
    [cartItemsPrice]
  );

  const renderedStripeButton = useMemo(
    () => (cartItemsPrice ? <StripeButton total={cartItemsPrice} /> : null),
    [cartItemsPrice]
  );

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeaderContainer>
      {renderedItems}
      <TotalContainer>TOTAL: ${cartItemsPrice}</TotalContainer>

      {renderedWarning}
      {renderedStripeButton}
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;

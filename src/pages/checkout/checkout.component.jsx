import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

import {
  selectCartItems,
  selectCartItemsPrice,
} from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({ cartItems, cartItemsPrice }) => {
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
        <p className="test-warning">
          This payment is a testing feature, do not use ur real card.
          <br />
          Card info: 4242 4242 4242 4242 | future date | 3 random digits
        </p>
      ) : null,
    [cartItemsPrice]
  );

  const renderedStripeButton = useMemo(
    () => (cartItemsPrice ? <StripeButton amount={cartItemsPrice} /> : null),
    [cartItemsPrice]
  );

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Decription</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {renderedItems}
      <span className="total">TOTAL: ${cartItemsPrice}</span>

      {renderedWarning}
      {renderedStripeButton}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsPrice: selectCartItemsPrice,
});

export default connect(mapStateToProps)(CheckoutPage);

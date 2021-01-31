import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const publishableKey =
  'pk_test_51IEweAKo2RsuzfWnq4AJLRUzJq2025CXkx6nzIVIyZFEAFerglcf8DKQGYtWSJHsozQkqQ8F7LUHlr24s4P5sfQD00lvjNrotK';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const onToken = () => {
    alert('Payment successful');
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="ITechArt Shop"
      billingAddress
      shippingAddres
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;

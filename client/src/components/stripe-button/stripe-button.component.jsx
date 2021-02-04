import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const publishableKey =
  "pk_test_51IEweAKo2RsuzfWnq4AJLRUzJq2025CXkx6nzIVIyZFEAFerglcf8DKQGYtWSJHsozQkqQ8F7LUHlr24s4P5sfQD00lvjNrotK";

const StripeButton = ({ total }) => {
  const priceForStripe = total * 100;
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Payment successful.");
      })
      .catch((error) => {
        alert("There was an error. Try using a valid payment card");
        console.log(error);
      });
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="ITechArt Shop"
      billingAddress
      shippingAddres
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${total}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;

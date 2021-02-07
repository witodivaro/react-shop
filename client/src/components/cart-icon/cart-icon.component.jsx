import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useReactiveVar } from '@apollo/client';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartDropdownHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { cartDropdownHiddenVar } from '../../graphql/cart/cart.variables';

import './cart-icon.styles.scss';

const CartIcon = ({ itemCount }) => {
  const cartDropdownHidden = useReactiveVar(cartDropdownHiddenVar);

  const toggleCartDropdownHidden = useCallback(() => {
    cartDropdownHiddenVar(!cartDropdownHidden);
  }, [cartDropdownHidden]);

  return (
    <div className="cart-icon" onClick={() => toggleCartDropdownHidden()}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartDropdownHidden: () => dispatch(toggleCartDropdownHidden()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

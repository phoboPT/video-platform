import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';
import formatString from '../../../lib/formatString';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  max-height: 105px;
  img {
    height: 70px;
    margin-right: 10px;
  }
  .cart-item-details {
    height: 100%;
    h3 {
      text-align: left;
      margin: 2rem 0rem auto 1rem;
    }

    p {
      text-align: left;
      margin-top: 2rem;
      margin-left: 1rem;
    }
  }
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img
      alt={cartItem.course.title}
      src={cartItem.course.thumbnail}
      width="100"
    />
    <div className="cart-item-details">
      <h3>{formatString(cartItem.course.title, 25)}</h3>
      <p>{cartItem.course.price} €</p>
    </div>
    <RemoveFromCart id={cartItem.id} />
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
export default CartItem;

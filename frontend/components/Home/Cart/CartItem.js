import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';
import formatString from '../../../lib/formatString';
import AddToWish from './AddToWish';

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
    #user {
      margin: 0;
      padding-top: 3px;
      padding-left: 1rem;
      text-align: left;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.6);
    }
    p {
      text-align: left;
      margin-top: 2rem;
      margin-left: 1rem;
    }
  }
  #actions {
    display: inline-block;
    height: 100%;
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
      <h3>{formatString(cartItem.course.title, 20)}</h3>
      <p id="user">{cartItem.course.user.name}</p>

      <p>{cartItem.course.price} €</p>
    </div>
    <div id="actions">
      <RemoveFromCart id={cartItem.id} />
      <AddToWish id={cartItem.id} courseId={cartItem.course.id} />
    </div>
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
export default CartItem;

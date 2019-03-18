import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0px;
  }
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img
      src={cartItem.course.thumbnail}
      width="100"
      alt={cartItem.course.title}
    />

    <div className="cart-item-details">
      <h3>{cartItem.course.title}</h3>
      <p>{cartItem.course.price} €</p>
    </div>
    <RemoveFromCart id={cartItem.id} />
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
export default CartItem;

import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import RemoveFromCart from "../Home/Cart/RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  max-height: 100px;
  img {
    max-height: 50px;
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0px;
  }
  span {
    font-size: 1rem;
    color: gray;
  }
  .price {
    text-align: right;
    padding-right: 15px;
  }
`;

const CartItem = ({ cartItem }) => {
  console.log("entrou", cartItem);

  return (
    <CartItemStyles>
      <img
        alt={cartItem.course.title}
        src={cartItem.course.thumbnail}
        width="100"
      />
      <div className="cart-item-details">
        <h3>{cartItem.course.title}</h3>
        <span>{cartItem.course.user.name}</span>
        <div className="price">
          <p>{cartItem.course.price} €</p>
        </div>
      </div>

      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
export default CartItem;

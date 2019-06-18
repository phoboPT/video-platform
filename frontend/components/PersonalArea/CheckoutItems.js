import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import RemoveFromCart from '../Home/Cart/RemoveFromCart';
import formatString from '../../lib/formatString';

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

const ToolTip = styled.div`
  .tooltip {
    z-index: 1;
    list-style: none;
    position: relative;
  }
  .tooltip:before,
  .tooltip:after {
    display: block;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
  .tooltip:after {
    border-right: 6px solid transparent;
    border-bottom: 14px solid rgba(0, 0, 0, 0.75);
    border-left: 6px solid transparent;
    content: '';
    height: 0;
    left: 100px;
    width: 0;
  }
  .tooltip:before {
    background: rgba(0, 0, 0, 0.75);
    border-radius: 2px;
    color: #fff;
    content: attr(data-title);
    font-size: 14px;
    padding: 6px 10px;
    top: 41px;
    white-space: nowrap;
  }

  /* the animations */
  /* fade */
  .tooltip.fade:after,
  .tooltip.fade:before {
    transform: translate3d(0, -10px, 0);
    transition: all 0.15s ease-in-out;
  }
  .tooltip.fade:hover:after,
  .tooltip.fade:hover:before {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const CartItem = ({ cartItem, length, showDelete }) => (
  <CartItemStyles>
    <img
      alt={cartItem.course.title}
      src={cartItem.course.thumbnail}
      width="100"
    />
    <div className="cart-item-details">
      {cartItem.course.title.length > length ? (
        <ToolTip>
          <div className="tooltip fade" data-title={cartItem.course.title}>
            <h3>{formatString(cartItem.course.title, length)}</h3>
          </div>
        </ToolTip>
      ) : (
        <h3>{cartItem.course.title}</h3>
      )}
      <span>{cartItem.course.user.name}</span>
      <div className="price">
        <p>{cartItem.course.price} €</p>
      </div>
    </div>
    {showDelete && <RemoveFromCart id={cartItem.id} />}
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  length: PropTypes.number,
  showDelete: PropTypes.bool,
};
export default CartItem;

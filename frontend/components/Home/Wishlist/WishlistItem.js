import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import RemoveFromWishlist from './RemoveFromWishlist';
import formatString from '../../../lib/formatString';
import AddToCart from './AddToCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  max-height: 105px;
  img {
    cursor: pointer;
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
    height: 100%;
  }
`;

const WishlistItem = ({ wishlist }) => (
  <CartItemStyles>
    <Link
      href={{
        pathname: '/course',
        query: { id: wishlist.course.id },
      }}
    >
      <img
        alt={wishlist.course.title}
        src={wishlist.course.thumbnail}
        width="100"
      />
    </Link>

    <div className="cart-item-details">
      <h3>{formatString(wishlist.course.title, 25)}</h3>
      <p id="user">{wishlist.course.user.name}</p>
      <p>{wishlist.course.price} €</p>
    </div>
    <div id="actions">
      <RemoveFromWishlist id={wishlist.course.id} wishlist={wishlist} />
      <AddToCart id={wishlist.course.id} wishlist={wishlist} />
    </div>
  </CartItemStyles>
);

WishlistItem.propTypes = {
  wishlist: PropTypes.object.isRequired,
};
export default WishlistItem;

/* eslint-disable react/display-name */
import gql from 'graphql-tag';
import React from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import User from '../../Authentication/User';
import CartStyles from '../../styles/CartStyles';
import CloseButton from '../../styles/CloseButton';
import WishlistItem from './WishlistItem';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation($cartOpen: Int) {
    toggleCart(cartOpen: $cartOpen) @client
  }
`;
const Composed = adopt({
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION} variables={{ cartOpen: 0 }}>
      {render}
    </Mutation>
  ),
  user: ({ render }) => <User>{render}</User>,
});
const Wishlist = () => (
  <Composed>
    {({ localState, toggleCart, user }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen === 2}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <p>
              Wishlist
              {me.wishlist.length > 0 ? ` (${me.wishlist.length})` : ' Empty'}
            </p>
          </header>
          <ul>
            {!me.wishlist[0] && (
              <div id="container">
                <div id="empty-cart">
                  <p id="wish-p">YOUR WISHLIST IS EMPTY</p>
                  <img
                    alt="empty"
                    id="wishImg"
                    src="../../../static/emptywish.svg"
                  />
                </div>
              </div>
            )}
            {me.wishlist.map(wishlist => (
              <WishlistItem wishlist={wishlist} key={wishlist.id} />
            ))}
          </ul>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Wishlist;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };

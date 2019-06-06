/* eslint-disable react/display-name */
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import calcTotalPrice from '../../../lib/calcTotalPrice';
import formatMoney from '../../../lib/formatMoney';
import User from '../../Authentication/User';
import CartStyles from '../../styles/CartStyles';
import CloseButton from '../../styles/CloseButton';
import SickButton from '../../styles/SickButton';
// import CartItem from './CartItem';

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
              {me.cart.length > 0 ? `(${me.cart.length})` : 'Empty'}
            </p>
          </header>
          <ul>
            {/* {me.cart.map(cartItem => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))} */}
          </ul>
          <footer>
            <div id="total">
              <p id="text">Total</p>
              <p id="value">{formatMoney(calcTotalPrice(me.cart))} </p>
            </div>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Wishlist;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
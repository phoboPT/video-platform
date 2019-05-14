/* eslint-disable react/display-name */
import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import calcTotalPrice from '../../../lib/calcTotalPrice';
import formatMoney from '../../../lib/formatMoney';
import User from '../../Authentication/User';
import CartStyles from '../../styles/CartStyles';
import CloseButton from '../../styles/CloseButton';
import SickButton from '../../styles/SickButton';
import Supreme from '../../styles/Supreme';
import CartItem from './CartItem';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
const Composed = adopt({
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  user: ({ render }) => <User>{render}</User>,
});
const Cart = () => (
  <Composed>
    {({ localState, toggleCart, user }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={localState.data.cartOpen}>
              <header>
                <CloseButton onClick={toggleCart} title="close">
                  &times;
                </CloseButton>
                <Supreme>{me.name}'s Cart</Supreme>
                <p>
                  You Have {me.cart.length} Item
                  {me.cart.length === 1 ? '' : 's'} in your cart.
                </p>
              </header>
              <ul>
                {me.cart.map(cartItem => (
                  <CartItem cartItem={cartItem} key={cartItem.id} />
                ))}
              </ul>
              <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))} </p>
                {me.cart.length && (
                  <Link href="/chekout">
                    <SickButton onClick={toggleCart}>Checkout</SickButton>
                  </Link>
                )}
              </footer>
            </CartStyles>
          )}
        </Query>
      );
    }}
  </Composed>
);
export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };

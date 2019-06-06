import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import swal from '@sweetalert/with-react';
import { CURRENT_USER_QUERY } from '../../Authentication/User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  top: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // remove item from cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
      >
        {(removeFromCart, { loading }) => (
          <BigButton
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err =>
                swal(
                  <div>
                    <h1>Error</h1>
                    <p>{err}</p>
                  </div>
                )
              );
            }}
            title="Delete Item"
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;

import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../../Authentication/User';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../CoursesList/ListAllCourses';
import { REMOVE_FROM_WISH_MUTATION } from './RemoveFromWishlist';

const Style = styled.div`
  button {
    background: none;
    border: none;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

class AddToCart extends Component {
  mutations = async (remove, add) => {
    await remove();
    await add();
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // remove item from cart
    const wishItemId = payload.data.removeFromWish.id;

    data.me.wishlist = data.me.wishlist.filter(
      wishitem => wishitem.id !== wishItemId
    );
    // write back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    const { id, wishlist } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_WISH_MUTATION}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromWish: {
            __typename: 'Whislist',
            id: wishlist.id,
          },
        }}
      >
        {removeFromWish => (
          <Mutation
            mutation={ADD_TO_CART_MUTATION}
            variables={{ id }}
            refetchQueries={[
              {
                query: ALL_COURSES_QUERY,
                variables: { published: 'PUBLISHED', skip: 0 },
              },
              {
                query: ALL_COURSES_ORDERED,
                variables: { published: 'PUBLISHED', skip: 0 },
              },
              {
                query: ALL_COURSE_INTERESTS,
                variables: { published: 'PUBLISHED', skip: 0 },
              },
              {
                query: ALL_COURSES_RATING,
                variables: { published: 'PUBLISHED', skip: 0 },
              },
              { query: CURRENT_USER_QUERY },
            ]}
          >
            {(addToCart, { loading }) => (
              <Style id="2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => this.mutations(removeFromWish, addToCart)}
                  name="add the course to the cart"
                >
                  <img alt="Add to Cart" src="../../../static/cart.webp" />
                </button>
              </Style>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddToCart;

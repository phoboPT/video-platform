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
import { REMOVE_FROM_CART_MUTATION } from './RemoveFromCart';
import { ADD_TO_WISHLIST_MUTATION } from '../WishButton';

const Style = styled.div`
  button {
    margin-right: 1.5rem;
    background: none;
    border: none;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .svg {
    height: 32px;
    width: 32px;
    fill: red;
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
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    const { id, courseId } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
        update={this.update}
      >
        {removeFromCart => (
          <Mutation
            mutation={ADD_TO_WISHLIST_MUTATION}
            variables={{ id: courseId }}
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
            {(addToWish, { loading }) => (
              <Style id="2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => this.mutations(removeFromCart, addToWish)}
                  name="add the course to the cart"
                >
                  <div className="svg">
                    <svg viewBox="0 0 32 32">
                      <path
                        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                      />
                    </svg>
                  </div>
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
  courseId: PropTypes.string.isRequired,
};

export default AddToCart;

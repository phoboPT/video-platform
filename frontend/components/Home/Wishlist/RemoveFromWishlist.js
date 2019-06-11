import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import swal from '@sweetalert/with-react';
import { CURRENT_USER_QUERY } from '../../Authentication/User';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../CoursesList/ListAllCourses';

const REMOVE_FROM_WISH_MUTATION = gql`
  mutation REMOVE_FROM_WISH_MUTATION($id: ID!) {
    removeFromWish(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  width: 100%;
  text-align: right;
  font-size: 3rem;
  background: none;
  border: 0;
  top: 0;
  margin-bottom: 2rem;

  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromWishlist extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    wishlist: PropTypes.object.isRequired,
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
    console.log('wish', wishlist);
    return (
      <Mutation
        mutation={REMOVE_FROM_WISH_MUTATION}
        variables={{ id }}
        update={this.update}
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
        ]}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromWish: {
            __typename: 'Wishlist',
            id: wishlist.id,
          },
        }}
      >
        {(removeFromWish, { loading }) => (
          <BigButton
            id="1"
            disabled={loading}
            onClick={() => {
              removeFromWish().catch(err =>
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

export default RemoveFromWishlist;
export { REMOVE_FROM_WISH_MUTATION };

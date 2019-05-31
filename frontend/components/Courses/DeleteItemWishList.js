import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../Home/CoursesList/ListAllCourses';

const REMOVE_FROM_WISH = gql`
  mutation REMOVE_FROM_WISH($id: ID!) {
    removeFromWish(id: $id) {
      id
    }
  }
`;
export class DeleteItemWishList extends Component {
  remove = async mutation => {
    const { refetch } = this.props;
    await mutation();
    refetch();
  };

  render() {
    const { id, skip } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_WISH}
        variables={{ id }}
        refetchQueries={[
          {
            query: ALL_COURSES_QUERY,
            variables: { published: 'PUBLISHED', skip },
          },

          {
            query: ALL_COURSES_ORDERED,
            variables: { published: 'PUBLISHED', skip },
          },
          {
            query: ALL_COURSE_INTERESTS,
            variables: { published: 'PUBLISHED', skip },
          },
          {
            query: ALL_COURSES_RATING,
            variables: { published: 'PUBLISHED', skip },
          },
        ]}
      >
        {removeWish => (
          <button
            type="button"
            onClick={() => this.remove(removeWish)}
            name="remove the course from the wish list"
          >
            Remove
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteItemWishList.propTypes = {
  id: PropTypes.number.isRequired,
  skip: PropTypes.number,
  refetch: PropTypes.func.isRequired,
};

export default DeleteItemWishList;

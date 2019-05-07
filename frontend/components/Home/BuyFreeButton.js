import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from './CoursesList/ListAllCourses';

const ADD_FREE_COURSE_MUTATION = gql`
  mutation ADD_FREE_COUSE_MUTATION($id: ID!) {
    buyCourseFree(id: $id) {
      id
    }
  }
`;

class BuyFreeButton extends Component {
  render() {
    const { id, skip } = this.props;
    return (
      <Mutation
        mutation={ADD_FREE_COURSE_MUTATION}
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
        variables={{
          id,
        }}
      >
        {(buyCourseFree, { loading }) => (
          <button
            type="button"
            disabled={loading}
            id="search-button"
            onClick={buyCourseFree}
          >
            Add To Your Courses
          </button>
        )}
      </Mutation>
    );
  }
}
BuyFreeButton.propTypes = {
  id: PropTypes.string.isRequired,
  skip: PropTypes.number.isRequired,
};
export default BuyFreeButton;

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
  mutation ADD_FREE_COURSE_MUTATION($id: ID!) {
    buyCourseFree(id: $id) {
      id
    }
  }
`;

class BuyFreeButton extends Component {
  update = (cache, payload) => {
    const { id } = this.props;
    console.log('hi');

    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the comments we want
    const data = cache.readQuery({
      query: ADD_FREE_COURSE_MUTATION,
      variables: { id },
    });

    console.log('data', data);
    // 2. Filter the deleted itemout of the page
    data.buyCourseFree = data.buyCourseFree.filter(
      item => item.id !== payload.data.buyCourseFree.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: ADD_FREE_COURSE_MUTATION,
      data,
      variables: { id },
    });
  };

  render() {
    const { id, skip } = this.props;
    return (
      <Mutation
        update={this.update}
        mutation={ADD_FREE_COURSE_MUTATION}
        optimisticResponse={{
          __typename: 'Mutation',
          buyCourseFree: {
            __typename: 'UserCourse',
            id,
          },
        }}
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

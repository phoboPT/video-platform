import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_COMMENTS_QUERY } from './ListComments';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../../CoursesList/ListAllCourses';
import { CHECK_RATE_COURSE_QUERY } from '../ViewCourse';

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteRateCourse(id: $id) {
      id
    }
  }
`;
export class DeleteComment extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the comments we want
    const data = cache.readQuery({
      query: ALL_COMMENTS_QUERY,
      variables: { id: this.props.data.course.id },
    });

    // 2. Filter the deleted itemout of the page
    data.rateCourseList = data.rateCourseList.filter(
      comment => comment.id !== payload.data.deleteRateCourse.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: ALL_COMMENTS_QUERY,
      data,
      variables: { id: this.props.data.course.id },
    });
  };

  render() {
    console.log(this.props.data.course.id);
    return (
      <Mutation
        mutation={DELETE_COMMENT_MUTATION}
        variables={{ id: this.props.data.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteRateCourse: {
            __typename: 'RateCourse',
            id: this.props.data.id,
          },
        }}
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
            query: CHECK_RATE_COURSE_QUERY,
            variables: { courseId: this.props.data.course.id },
          },
          {
            query: ALL_COURSES_RATING,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
        ]}
      >
        {(deleteRateCourse, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your comment?')) {
                deleteRateCourse();
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteComment;

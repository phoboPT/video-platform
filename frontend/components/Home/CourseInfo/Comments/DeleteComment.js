import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
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
class DeleteComment extends Component {
  update = (cache, payload) => {
    const { course } = this.props.data;
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the comments we want
    const data = cache.readQuery({
      query: ALL_COMMENTS_QUERY,
      variables: { id: course.id },
    });

    // 2. Filter the deleted itemout of the page
    data.rateCourseList = data.rateCourseList.filter(
      comment => comment.id !== payload.data.deleteRateCourse.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: ALL_COMMENTS_QUERY,
      data,
      variables: { id: course.id },
    });
  };

  deleteComment = mutation => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this comment!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('Your comment has been deleted!', {
          icon: 'success',
        });
        mutation();
      } else {
        swal('Your comment is safe!');
      }
    });
  };

  render() {
    const { data, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_COMMENT_MUTATION}
        variables={{ id: data.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteRateCourse: {
            __typename: 'RateCourse',
            id: data.id,
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
            variables: { courseId: data.course.id },
          },
          {
            query: ALL_COURSES_RATING,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
        ]}
      >
        {(deleteRateCourse, { error }) => (
          <button
            type="button"
            onClick={() => this.deleteComment(deleteRateCourse)}
            name="delete the comment"
          >
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteComment.propTypes = {
  data: PropTypes.object,
  children: PropTypes.string.isRequired,
};

export default DeleteComment;

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_COURSES_QUERY } from './MyCourses';

const DELETE_COURSE_MUTATION = gql`
  mutation DELETE_COURSE_MUTATION($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

const ButtonStyle = styled.div`
  button {
    background: none;
    border: none;
    padding: 0px;
  }
`;
class DeleteCourse extends Component {
  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_COURSE_MUTATION}
        variables={{ id }}
        // update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteCourse: {
            __typename: 'Course',
            id,
          },
        }}
        refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
      >
        {(deleteRateCourse, { error }) => (
          <ButtonStyle>
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('Are you sure you want to delete your comment?')) {
                  deleteRateCourse();
                }
              }}
            >
              {children}
            </button>
          </ButtonStyle>
        )}
      </Mutation>
    );
  }
}

export default DeleteCourse;
//   update = (cache, payload) => {
//     // manually update the cache on the client, so it matches the server
//     // 1. Read the cache for the comments we want
//     const data = cache.readQuery({
//       query: ALL_COMMENTS_QUERY,
//       variables: { id: this.props.data.course.id }
//     });

//     // 2. Filter the deleted itemout of the page
//     data.rateCourseList = data.rateCourseList.filter(
//       comment => comment.id !== payload.data.deleteRateCourse.id
//     );
//     // 3. Put the items back!
//     cache.writeQuery({
//       query: ALL_COMMENTS_QUERY,
//       data,
//       variables: { id: this.props.data.course.id }
//     });
//   };

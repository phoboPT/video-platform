import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteRateCourse(id: $id) {
      id
    }
  }
`;
export class DeleteComment extends Component {
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
  render() {
    const { data, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_COMMENT_MUTATION}
        variables={{ id: data.id }}
        // update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteRateCourse: {
            __typename: 'RateCourse',
            id: data.id,
          },
        }}
        refetchQueries={[]}
      >
        {(deleteRateCourse, { error }) => (
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
        )}
      </Mutation>
    );
  }
}

export default DeleteComment;

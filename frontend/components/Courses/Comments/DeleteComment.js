import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_COMMENTS_QUERY } from "./ListComments";

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteComCourse(id: $id) {
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
      variables: { id: this.props.data.course.id }
    });

    // console.log(data.comCourse, " ", payload.data.deleteComCourse.id);
    // 2. Filter the deleted itemout of the page
    data.comCourse = data.comCourse.filter(
      comment => comment.id !== payload.data.deleteComCourse.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: ALL_COMMENTS_QUERY,
      data,
      variables: { id: this.props.data.course.id }
    });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_COMMENT_MUTATION}
        variables={{ id: this.props.data.id }}
        update={this.update}
      >
        {(deleteComCourse, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete your comment?")) {
                deleteComCourse();
              }
            }}
          >
            Delete Button
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteComment;

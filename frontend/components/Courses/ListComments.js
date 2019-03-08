import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CommentItem from "./CommentItem";

const ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY($courseId: ID!) {
    comCourse(where: { id: $courseId }) {
      id
      comment
      user {
        id
        name
      }
      createdAt
    }
  }
`;

export class ListComments extends Component {
  render() {
    return (
      <Query
        query={ALL_COMMENTS_QUERY}
        variables={{ courseId: this.props.data.id }}
      >
        {({ error, loading, data }) => {
          if (error) return <p>Error!</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.comCourse) return <p>No Comments</p>;

          return (
            <>
              {data.comCourse.map(comments => (
                <CommentItem comments={comments} key={comments.id} />
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

export default ListComments;
export { ALL_COMMENTS_QUERY };

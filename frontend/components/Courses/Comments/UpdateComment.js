import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Error from "../../ErrorMessage";
const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($id: ID!, $comment: String) {
    updateComCourse(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;

const SINGLE_COMMENT_QUERY = gql`
  query SINGLE_COMMENT_QUERY($id: ID!) {
    comCourse(where: { id: $id }) {
      id
      comment
    }
  }
`;

export class UpdateComment extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  update = async (e, updateCommentMutation) => {
    e.preventDefault();

    const res = await updateCommentMutation({
      variables: {
        id: this.props.data.id,
        ...this.state
      }
    });
  };

  render() {
    return (
      <Query
        query={SINGLE_COMMENT_QUERY}
        variables={{ id: this.props.data.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          return (
            <Mutation mutation={UPDATE_COMMENT_MUTATION}>
              {(updateCommentMutation, { loading, error }) => (
                <form
                  onSubmit={e => {
                    this.update(e, updateCommentMutation);
                    this.props.changeState();
                  }}
                >
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="comment">
                      <input
                        type="text"
                        name="comment"
                        placeholder="comment"
                        value={this.comment}
                        defaultValue={data.comCourse.comment}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button onClick={this.props.changeState}>Cancelar</button>
                  </fieldset>
                </form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateComment;

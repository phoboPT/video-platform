import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Error from "../../../Static/ErrorMessage";
import styled from "styled-components";

const Style = styled.div`
  button {
    color: #161616;
    font-size: 16px;
    font-weight: 700;
    margin: 20px;
    padding: 8px;
    background-color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    border: none;
  }
  button:hover {
    background: #e8e8e8;
  }
  input {
    height: 50px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: #1c1c1c;
    border: none;
    transition: 0.3s;
    outline: none;
    opacity: 0.6;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  }
  input:focus {
    opacity: 1;
    border-bottom: 2px solid #1c1c1c;
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 10px;
  }
`;

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
            <Style>
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
                          size="80"
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
            </Style>
          );
        }}
      </Query>
    );
  }
}

export default UpdateComment;

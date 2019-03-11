import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "../../ErrorMessage";
import { ALL_COMMENTS_QUERY } from "./ListComments";

const Style = styled.div`
  text-align: right;
  textarea {
    resize: none;
    overflow: auto;
    margin: 2rem;
    float: right;
    width: calc(100% - 35px);
    height: auto;
  }
  fieldset {
    border: none;
  }
  button {
    color: #ffffff;
    font-size: 17px;
    padding: 15px;
    padding-right: 2rem;
    background-color: #161616;
    text-decoration: none;
    cursor: pointer;
  }
`;

const ADD_COMMENT = gql`
  mutation ADD_COMMENT($courseId: ID!, $comment: String!) {
    createComCourse(courseId: $courseId, comment: $comment) {
      id
    }
  }
`;

export class CommentForm extends Component {
  state = {
    courseId: this.props.data.id,
    comment: ""
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_COMMENT}
        variables={this.state}
        refetchQueries={[
          {
            query: ALL_COMMENTS_QUERY,
            variables: { id: this.state.courseId }
          }
        ]}
      >
        {(createComCourse, { loading, error }) => (
          <Style>
            <form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createComCourse();
                this.setState({ comment: "" });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Write your comment"
                  required
                  rows="6"
                  value={this.state.comment}
                  onChange={this.saveState}
                />
                <button>Comment</button>
              </fieldset>
            </form>
          </Style>
        )}
      </Mutation>
    );
  }
}
export default CommentForm;

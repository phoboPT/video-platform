import gql from "graphql-tag";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Error from "../../../Static/ErrorMessage";
import { ALL_COMMENTS_QUERY } from "./ListComments";
import Rating from "./Rating";

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
  span {
  }
`;

const ADD_RATING = gql`
  mutation ADD_RATING($courseId: ID!, $comment: String!, $rating: Float!) {
    createRateCourse(courseId: $courseId, comment: $comment, rating: $rating) {
      id
    }
  }
`;

export class CommentForm extends Component {
  state = {
    comment: "",
    courseId: this.props.data.id
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getRating = rating => {
    this.setState({ rating: rating });
  };

  saveData = async (mutation, e) => {
    e.preventDefault();
    if (this.state.rating) {
      const res = await mutation();
      this.setState({ comment: "" });
    } else {
      alert("Please Add a Rating to Submit");
    }
  };
  render() {
    return (
      <Mutation
        mutation={ADD_RATING}
        variables={this.state}
        refetchQueries={[
          {
            query: ADD_RATING,
            variables: { id: this.state.courseId, rating: this.state.rating }
          }
        ]}
        variables={this.state}
      >
        {(createComCourse, { error, loading }) => {
          return (
            <Style>
              <form
                onSubmit={async e => {
                  e.preventDefault();

                  this.saveData(createComCourse, e);
                  // const res = await createComCourse();
                  //
                }}
              >
                <Error error={error} />

                <div className="rating">
                  <Rating
                    getRating={this.getRating}
                    initialValue="0"
                    readOnly={false}
                  />
                </div>

                <fieldset aria-busy={loading} disabled={loading}>
                  <textarea
                    id="comment"
                    name="comment"
                    onChange={this.saveState}
                    placeholder="Write your comment"
                    required
                    rows="6"
                    value={this.state.comment}
                  />
                  <button>Comment</button>
                </fieldset>
              </form>
            </Style>
          );
        }}
      </Mutation>
    );
  }
}

export default CommentForm;

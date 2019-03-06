import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import { Mutation } from "react-apollo";
import { CURRENT_COURSES_QUERY } from "./MyCourses";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    # $target: String!
    $thumbnail: String!
    $description: String!
    $price: Float!
  ) {
    createCourse(
      title: $title
      # target: $target
      thumbnail: $thumbnail
      description: $description
      price: $price
    ) {
      id
    }
  }
`;

const Container = styled.div`
  max-width: 70%;
  margin: auto;
  label {
    text-align: left;
  }
  button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
`;

class FormCourse extends Component {
  state = {
    title: "",
    description: "",
    state_: "",
    target: "",
    thumbnail: "",
    price: 0
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Mutation
          mutation={CREATE_COURSE_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
        >
          {(createCourse, { loading, error }) => (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await createCourse();
                this.props.saveToState(res.data.createCourse.id);
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Information</h2>
                <label htmlFor="Title">
                  Title
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={this.title}
                    onChange={this.saveState}
                    // required
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={this.description}
                    onChange={this.saveState}
                    required
                  />
                </label>
                <label htmlFor="state">
                  State
                  <input
                    type="text"
                    name="state"
                    placeholder="state"
                    value={this.state_}
                    onChange={this.saveState}
                    required
                  />
                </label>
                <label htmlFor="target">
                  Target
                  <input
                    type="text"
                    name="target"
                    placeholder="target"
                    value={this.target}
                    onChange={this.saveState}
                    required
                  />
                </label>
                <label htmlFor="thumbnail">
                  Thumbnail
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="thumbnail"
                    value={this.thumbnail}
                    onChange={this.saveState}
                    required
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    min="1"
                    step="any"
                    name="thumbnail"
                    placeholder="Price, "
                    value={this.price}
                    onChange={this.saveState}
                    required
                  />
                </label>
                <button type="submit">Next</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default FormCourse;

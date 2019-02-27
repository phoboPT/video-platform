import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import { Mutation } from "react-apollo";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    # $target: String!
    $thumbnail: String!
    $description: String!
  ) {
    createCourse(
      title: $title
      # target: $target
      thumbnail: $thumbnail
      description: $description
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
`;

class FormCourse extends Component {
  state = {
    title: "",
    description: "",
    state_: "",
    target: "",
    thumbnail: ""
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Mutation mutation={CREATE_COURSE_MUTATION} variables={this.state}>
          {(createCourse, { isLoading, isError }) => (
            <Form
              method="post"
              onSubmit={async e => {
                console.log("submit");
                e.preventDefault();
                const res = await createCourse();
                this.props.saveToState(res.data.createCourse.id);
              }}
            >
              <Error error={isError} />
              <fieldset disabled={isLoading} aria-busy={isLoading}>
                <h2>Information</h2>
                <label htmlFor="Title">
                  Title
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={this.title}
                    onChange={this.saveState}
                    required
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

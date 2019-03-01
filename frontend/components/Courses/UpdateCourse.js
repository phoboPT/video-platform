import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import { Mutation, Query } from "react-apollo";
import LinkStyle from "../styles/LinkStyle";
import Link from "next/link";
import { Container } from "../styles/Container";

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
    }
  }
`;

const UPDATE_COURSE_MUTATION = gql`
  mutation UPDATE_COURSE_MUTATION(
    $id: ID!
    $title: String
    # $target: String!
    $thumbnail: String
    $description: String
  ) {
    updateCourse(
      id: $id
      title: $title
      # target: $target
      thumbnail: $thumbnail
      description: $description
    ) {
      id
      title
      thumbnail
      description
    }
  }
`;

class UpdateCourse extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateCourse = async (e, updateCourseMutation) => {
    e.preventDefault();

    const res = await updateCourseMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };

  render() {
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {this.props.id}</p>;

          return (
            <LinkStyle>
              <Container className="container">
                <section id="main">
                  <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
                </section>
                <Mutation
                  mutation={UPDATE_COURSE_MUTATION}
                  variables={this.state}
                >
                  {(updateCourse, { loading, error }) => (
                    <Form onSubmit={e => this.updateCourse(e, updateCourse)}>
                      <Error error={error} />
                      <aside id="sidebar">
                        <fieldset disabled={loading} aria-busy={loading}>
                          <h2>Information</h2>
                          <label htmlFor="Title">
                            Title
                            <input
                              type="text"
                              name="title"
                              placeholder="title"
                              defaultValue={data.course.title}
                              onChange={this.handleChange}
                            />
                          </label>
                          <label htmlFor="description">
                            Description
                            <input
                              type="text"
                              name="description"
                              placeholder="description"
                              defaultValue={data.course.description}
                              onChange={this.handleChange}
                            />
                          </label>
                          <label htmlFor="state">
                            State
                            <input
                              type="text"
                              name="state"
                              placeholder="state"
                              defaultValue={data.course.state}
                              onChange={this.handleChange}
                            />
                          </label>
                          <label htmlFor="target">
                            Target
                            <input
                              type="text"
                              name="target"
                              placeholder="target"
                              value={this.target}
                              onChange={this.handleChange}
                              defaultValue={data.course.target}
                            />
                          </label>
                          <label htmlFor="thumbnail">
                            Thumbnail
                            <input
                              type="text"
                              name="thumbnail"
                              placeholder="thumbnail"
                              value={this.thumbnail}
                              defaultValue={data.course.thumbnail}
                              onChange={this.handleChange}
                            />
                          </label>

                          <button type="submit">
                            Sav{loading ? "ing" : "e"} To Course
                          </button>
                        </fieldset>
                      </aside>
                    </Form>
                  )}
                </Mutation>
              </Container>
            </LinkStyle>
          );
        }}
      </Query>
    );
  }
}

export default UpdateCourse;

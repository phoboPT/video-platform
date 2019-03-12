import React, { Component } from "react";
import styled from "styled-components";
import Form from "../../styles/Form";
import gql from "graphql-tag";
import Error from "../../Static/ErrorMessage";
import { Mutation, Query } from "react-apollo";
import { CURRENT_COURSES_QUERY } from "../MyCourses/MyCourses";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    # $target: String!
    $thumbnail: String!
    $description: String!
    $price: Float!
    $category: ID!
  ) {
    createCourse(
      title: $title
      # target: $target
      thumbnail: $thumbnail
      description: $description
      price: $price
      category: $category
    ) {
      id
    }
  }
`;

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      name
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
    price: 0,
    category: ""
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Query query={ALL_CATEGORIES_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading</p>;

            return (
              <Mutation
                mutation={CREATE_COURSE_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
              >
                {(createCourse, { loading, error }) => (
                  <>
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
                        <label htmlFor="price">
                          Price
                          <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            placeholder="Price in cents"
                            value={this.price}
                            onChange={this.saveState}
                            required
                          />
                        </label>

                        <label htmlFor="category">Category</label>

                        {this.state.category === "" ? (
                          this.setState({ category: data.categories[0].id })
                        ) : (
                          <></>
                        )}
                        <select
                          id="dropdownlist"
                          onChange={this.handleChange}
                          name="category"
                        >
                          {data.categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <br />
                        <br />
                        <button>Next</button>
                      </fieldset>
                    </Form>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default FormCourse;

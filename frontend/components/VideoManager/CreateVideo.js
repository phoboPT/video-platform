import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import styled from "styled-components";
import Error from "../ErrorMessage.js";
import { ALL_VIDEOS_USER } from "../Videos/Videos";

const CREATE_VIDEO_MUTATION = gql`
  mutation CREATE_VIDEO_MUTATION(
    $title: String!
    $description: String!
    $category: ID!
    $thumbnail: String
    $urlVideo: String
  ) {
    createVideo(
      title: $title
      description: $description
      category: $category
      thumbnail: $thumbnail
      urlVideo: $urlVideo
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
    margin-top: 1rem;
  }
`;
const ALL_CATEGORY = gql`
  query ALL_CATEGORY {
    categories {
      id
      name
    }
  }
`;

class CreateVideo extends Component {
  state = {
    title: "",
    description: "",
    urlVideo: "",
    thumbnail: "",
    category: ""
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  saveCategory = e => {
    this.setState({ category: e.target.value });
  };

  render() {
    return (
      <Query query={ALL_CATEGORY}>
        {({ data, error, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error:{error.message}</p>;
          }
          return (
            <Container>
              <Mutation
                mutation={CREATE_VIDEO_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_VIDEOS_USER }]}
              >
                {(createVideo, { loading, error }) => (
                  <Form
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await createVideo();
                    }}
                  >
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Video</h2>
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        required
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        required
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="urlVideo">Video</label>
                      <input
                        type="text"
                        name="urlVideo"
                        id="urlVideo"
                        placeholder="Video"
                        required
                        value={this.state.urlVideo}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="thumbnail">Thumbnail</label>
                      <input
                        type="text"
                        name="thumbnail"
                        id="thumbnail"
                        placeholder="Thumbnail"
                        required
                        value={this.state.thumbnail}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="thumbnail">Category</label>

                      {this.state.category === "" ? (
                        this.setState({ category: data.categories[0].id })
                      ) : (
                        <></>
                      )}
                      <select id="dropdownlist" onChange={this.saveCategory}>
                        {data.categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <button type="submit">Sav{loading ? "ing" : "e"}</button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default CreateVideo;
export { CREATE_VIDEO_MUTATION };

import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import styled from "styled-components";
import Error from "../ErrorMessage.js";
import { ALL_VIDEOS_USER } from "../Videos/Videos";
import Router from "next/router";

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
  text-align: center;
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
    margin-top: 1rem;
  }

  .true {
    width: auto;
    background: #d6887c;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
    margin-top: 1rem;
  }
  img {
    height: 50px;
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
    category: "",
    hasVideo: true,
    isUploading: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadVideo = async e => {
    console.log(this.state.isUploading);

    this.setState({
      isUploading: 1
    });
    console.log(this.state.isUploading);

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "video-platform");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deky2cxlm/video/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    if (file) {
      this.setState({
        hasVideo: false
      });
    }
    console.log(file);
    this.setState({
      urlVideo: file.url,
      isUploading: 0
    });
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
                      Router.push({
                        pathname: "/video",
                        query: { id: res.data.createVideo.id }
                      });
                    }}
                  >
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Video</h2>
                      <label htmlFor="file">Video</label>

                      {this.state.isUploading === 1 ? (
                        <img src="../../static/loading.gif" />
                      ) : (
                        <input
                          className="file"
                          type="file"
                          name="file"
                          id="file"
                          placeholder="Upload a Video"
                          // required
                          onChange={this.uploadVideo}
                        />
                      )}
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

                      <button
                        type="submit"
                        disabled={this.state.hasVideo}
                        className={this.state.hasVideo.toString()}
                      >
                        Sav{loading ? "ing" : "e"}
                      </button>
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

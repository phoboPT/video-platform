import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "../../styles/Form";
import styled from "styled-components";
import Error from "../../Static/ErrorMessage.js";
import { ALL_VIDEOS_USER } from "../MyVideos/Videos";
import Router from "next/router";
import { ALL_COURSES_QUERY } from "../../Home/CoursesList/ListAllCourses";
import validateExtension from "../../../lib/validateFileExtensions";

const CREATE_VIDEO_MUTATION = gql`
  mutation CREATE_VIDEO_MUTATION(
    $title: String!
    $description: String!
    $urlVideo: String
    $course: ID!
    $file: String
  ) {
    createVideo(
      title: $title
      description: $description
      urlVideo: $urlVideo
      course: $course
      file: $file
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

  .false {
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
const COURSE_QUERY = gql`
  query COURSE_QUERY {
    courses {
      id
      title
    }
  }
`;

class CreateVideo extends Component {
  state = {
    title: "",
    description: "",
    urlVideo: "",
    category: "",
    course: "",
    file: "",
    hasVideo: false,
    isUploading: 0,
    isUploadingFile: 0,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadVideo = async e => {
    this.setState({
      isUploading: 1,
    });

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "video-platform");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deky2cxlm/video/upload",
      { method: "POST", body: data },
    );
    const file = await res.json();
    if (file) {
      this.setState({
        hasVideo: true,
      });
    }
    this.setState({
      urlVideo: file.secure_url,
      isUploading: 2,
    });
  };

  uploadFile = async e => {
    this.setState({
      isUploadingFile: 1,
    });

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "fileUpload");
    const fileName = files[0].name;
    const isValid = validateExtension(fileName);

    if (isValid) {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/deky2cxlm/raw/upload",
        { method: "POST", body: data },
      );

      const file = await res.json();
      if (file) {
        this.setState({
          hasFile: false,
        });
      }
      this.setState({
        file: file.secure_url,
        isUploadingFile: 2,
      });
    } else {
      console.log("Error ", fileName);
    }
  };

  saveCategory = e => {
    this.setState({ category: e.target.value });
  };
  saveCourse = e => {
    this.setState({ course: e.target.value });
  };

  render() {
    return (
      <Query query={COURSE_QUERY}>
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
                refetchQueries={[
                  { query: ALL_VIDEOS_USER },
                  { query: ALL_COURSES_QUERY },
                ]}
              >
                {(createVideo, { loading, error }) => (
                  <Form
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await createVideo();
                      Router.push({
                        pathname: "/video",
                        query: { id: res.data.createVideo.id },
                      });
                    }}
                  >
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Video</h2>
                      <label htmlFor="file">
                        Video
                        {this.state.isUploading === 0 && (
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
                      </label>

                      {this.state.isUploading === 1 && (
                        <img src="../../static/loading.gif" />
                      )}
                      {this.state.isUploading === 2 && (
                        <img src="../../static/done.png" />
                      )}
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Title"
                          required
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <input
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          required
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="file">
                        Files
                        <input
                          type="file"
                          name="file"
                          id="file"
                          placeholder="file"
                          onChange={this.uploadFile}
                        />
                      </label>
                      <label htmlFor="course">
                        Course
                        {this.state.course === "" &&
                          this.setState({ course: data.courses[0].id })}
                        <select
                          id="dropdownlist"
                          name="course"
                          onChange={this.handleChange}
                        >
                          {data.courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="submit"
                        disabled={!this.state.hasVideo}
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

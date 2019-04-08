import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
// import ReactQuill from "react-quill"; // ES6
import styled from "styled-components";
import VideoItem from "../../../Home/CourseInfo/VideoItem";
import Error from "../../../Static/ErrorMessage";
import Form from "../../../styles/Form";
import Editor from "../../Editor";
import RemoveVideoButton from "./RemoveVideoButton";
import Unpublished from "../../CourseState/Unpublished";
import Published from "../../CourseState/Published";

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
      videos {
        video {
          id
          description
          title
          file
        }
      }
    }
  }
`;

const UPDATE_COURSE_MUTATION = gql`
  mutation UPDATE_COURSE_MUTATION(
    $id: ID!
    $title: String
    $state: String
    $thumbnail: String
    $description: String
  ) {
    updateCourse(
      id: $id
      title: $title
      state: $state
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

const CourseContainer = styled.div`
  color: black;
  display: flex;
  background: #e3e3e5;

  .info-container {
    display: flex;
    width: 70%;
    label {
      text-align: left;
    }
    form {
      border: none !important;
    }
    img {
      text-align: center !important;
    }
  }
  .actions-container {
    width: 20%;
  }

  #courseState {
    padding-top: 10px;
    padding-bottom: 10px;

    button {
      color: #3d3d3d;
      font-size: 17px;
      font-weight: 400;
      border: 1px solid #cccccc;
      background: #f7f7f7;
      cursor: pointer;
      position: relative;
    }
    button:hover {
      outline: none;
      background: #e5e5e5;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }

  img {
    max-height: 200px;
  }

  .description {
    background-color: lightgray;
  }
`;

const VideoListStyle = styled.h3`
  text-align: center;
`;

const Marcador = styled.div`
  button {
    border: 2px solid red;
    border-bottom: 0;
    font-size: 22px;
    font-weight: 400;
    height: 50px;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;

class UpdateCourse extends Component {
  state = {
    changeThumbnail: false,
    published: "",
    unpublished: "",
    state: "",
    alreadyExecuted: false
  };

  changePublished = e => {
    this.setState({
      state: "PUBLISHED",
      published: !this.state.published,
      unpublished: !this.state.unpublished
    });
  };

  changeUnpublished = e => {
    this.setState({
      state: "UNPUBLISHED",
      published: !this.state.published,
      unpublished: !this.state.unpublished
    });
  };

  courseState = actualState => {
    this.setState({
      state: actualState,
      alreadyExecuted: true,
      published: actualState === "PUBLISHED" ? true : false,
      unpublished: actualState === "UNPUBLISHED" ? true : false
    });
  };

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
  changeQuill = e => {
    this.setState({ description: e });
  };

  uploadThumbnail = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "thumbnail");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deky2cxlm/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();
    this.setState({ changeThumbnail: true, thumbnail: file.secure_url });
  };
  render() {
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {this.props.id}</p>;

          if (!this.state.alreadyExecuted) {
            this.courseState(data.course.state);
          }

          return (
            <>
              <Mutation
                mutation={UPDATE_COURSE_MUTATION}
                variables={this.state}
              >
                {(updateCourse, { loading, error }) => (
                  <>
                    <Marcador>
                      <button>Info</button>
                      <button>Media</button>
                    </Marcador>
                    <CourseContainer>
                      <Form onSubmit={e => this.updateCourse(e, updateCourse)}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                          <div id="info-container">
                            <h2>Information</h2>
                            <label htmlFor="Image">
                              <img src={data.course.thumbnail} />
                            </label>
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
                              <div className="description">
                                <Editor
                                  data={data.course.description}
                                  changeQuill={this.changeQuill}
                                />
                              </div>
                            </label>
                            <label htmlFor="state">
                              State
                              <div id="courseState">
                                <Published
                                  published={this.state.published}
                                  changePublished={this.changePublished}
                                />
                                <Unpublished
                                  unpublished={this.state.unpublished}
                                  changeUnpublished={this.changeUnpublished}
                                />
                              </div>
                            </label>

                            <label htmlFor="thumbnail">
                              Thumbnail
                              <br />
                              <input
                                type="file"
                                name="thumbnail"
                                placeholder="thumbnail"
                                value={this.thumbnail}
                                onChange={this.uploadThumbnail}
                              />
                            </label>
                            {this.state.changeThumbnail ? (
                              data.course.thumbnail && (
                                <img src={this.state.thumbnail} />
                              )
                            ) : (
                              <img src={data.course.thumbnail} />
                            )}
                            <br />
                            <b />
                            <br />
                          </div>
                          <div className="actions-container">
                            <button type="submit">
                              Sav{loading ? "ing" : "e"} To Course
                            </button>
                          </div>
                        </fieldset>
                      </Form>
                    </CourseContainer>
                    <VideoListStyle>Videos</VideoListStyle>
                    {data.course.videos.map((video, index) => (
                      <VideoItem
                        videos={video}
                        data={index}
                        key={video.video.id}
                      >
                        <RemoveVideoButton
                          courseId={data.course.id}
                          id={video.video.id}
                        />
                      </VideoItem>
                    ))}
                  </>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default UpdateCourse;
export { CourseContainer, SINGLE_COURSE_QUERY };

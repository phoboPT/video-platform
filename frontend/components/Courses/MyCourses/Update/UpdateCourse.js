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

const CourseContainer = styled.div`
  display: grid;
  color: black;
  display: flex;
  background: #e3e3e5;
  padding: 20px 0px;

  .info-bar {
    text-align: center;
    min-height: 50px;
    flex: 2;
    order: 2;
    padding-left: 25px;
    label {
      text-align: left;
    }
    form {
      border: none;
    }
    img {
      text-align: center !important;
    }
  }

  img {
    max-height: 200px;
  }

  .description {
    background-color: lightgray;
  }
  .video-bar {
    padding-right: 25px;
    text-align: center;
    flex: 1;
    order: 1;
    margin: auto;
  }
`;
const VideoListStyle = styled.h3`
  text-align: center;
`;

class UpdateCourse extends Component {
  state = { changeThumbnail: false };

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
        ...this.state,
      },
    });
  };
  changeQuill = e => {
    // console.log("2", e);
    this.setState({ description: e });
  };

  uploadThumbnail = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "thumbnail");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deky2cxlm/image/upload",
      { method: "POST", body: data },
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
          return (
            <>
              <Mutation
                mutation={UPDATE_COURSE_MUTATION}
                variables={this.state}
              >
                {(updateCourse, { loading, error }) => (
                  <>
                    <CourseContainer>
                      <div className="video-bar">
                        <img src={data.course.thumbnail} />
                      </div>
                      <div className="info-bar">
                        <Form
                          onSubmit={e => this.updateCourse(e, updateCourse)}
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
                                defaultValue={data.course.title}
                                onChange={this.handleChange}
                              />
                            </label>
                            <label htmlFor="description">
                              Description
                              <div className="description">
                                {/* <ReactQuill
                                  defaultValue={data.course.description}
                                  onChange={this.changeQuill}
                                /> */}
                                <Editor
                                  data={data.course.description}
                                  changeQuill={this.changeQuill}
                                />
                              </div>
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
                            <button type="submit">
                              Sav{loading ? "ing" : "e"} To Course
                            </button>
                          </fieldset>
                        </Form>
                      </div>
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

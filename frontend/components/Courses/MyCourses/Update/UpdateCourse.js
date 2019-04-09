import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
// import ReactQuill from "react-quill"; // ES6
import styled, { keyframes } from "styled-components";
import VideoItem from "../../../Home/CourseInfo/VideoItem";
import Error from "../../../Static/ErrorMessage";
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
const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
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
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }

    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

const CourseContainer = styled.div`
  color: black;
  background: #e3e3e5;
  display: flex;

  .info-container {
    order: 1;
    flex: 3;
    label {
      text-align: left;
    }
  }
  .actions-container {
    order: 2;
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    input {
      margin: 10px;
    }
    label {
      margin: 40px;
      img {
        margin-top: 10px;
        width: 100%;
        height: 80%;
      }
    }
    #submit {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: none;
      background: #27ad39;
      margin-top: 40px;
      cursor: pointer;
      color: white;
      :focus {
        outline: none;
      }
    }

    #submitLoading {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: 2px solid #727272;
      background: white;
      color: #727272;
      margin-top: 40px;
      cursor: pointer;
    }
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
  margin-top: 100px;
  button {
    border: 2px solid black;
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
                    <form>
                      <input
                        type="button"
                        value="Go back!"
                        onclick={() => history.back}
                      />
                    </form>
                    <Marcador>
                      <button>Info</button>
                      <button>Media</button>
                    </Marcador>
                    <CourseContainer>
                      <div className="info-container">
                        <Form>
                          <Error error={error} />
                          <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Edit Course</h2>
                            {/* <label htmlFor="Image">
                              <img src={data.course.thumbnail} />
                            </label> */}
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
                          </fieldset>
                        </Form>
                      </div>
                      {/* divisao  */}
                      <div className="actions-container">
                        <form
                          onSubmit={e => this.updateCourse(e, updateCourse)}
                        >
                          <button
                            id={loading ? "submitLoading" : "submit"}
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save Changes"}
                          </button>
                        </form>
                        <label htmlFor="state">
                          Course State
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
                          Thumbnail Preview
                          {this.state.changeThumbnail ? (
                            data.course.thumbnail && (
                              <img src={this.state.thumbnail} />
                            )
                          ) : (
                            <img src={data.course.thumbnail} />
                          )}
                          <input
                            type="file"
                            name="thumbnail"
                            placeholder="thumbnail"
                            value={this.thumbnail}
                            onChange={this.uploadThumbnail}
                          />
                        </label>
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

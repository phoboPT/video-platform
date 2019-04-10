import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
// import ReactQuill from "react-quill"; // ES6
import styled, { keyframes } from "styled-components";
import Error from "../../../Static/ErrorMessage";
import Published from "../../CourseState/Published";
import Unpublished from "../../CourseState/Unpublished";
import Editor from "../../Editor";

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

const VideoListStyle = styled.h3`
  text-align: center;
`;

class Update extends Component {
  state = {
    alreadyExecuted: false,
    changeThumbnail: false,
    published: "",
    state: "",
    unpublished: ""
  };

  changePublished = e => {
    this.setState({
      published: !this.state.published,
      state: "PUBLISHED",
      unpublished: !this.state.unpublished
    });
  };

  changeUnpublished = e => {
    this.setState({
      published: !this.state.published,
      state: "UNPUBLISHED",
      unpublished: !this.state.unpublished
    });
  };

  courseState = actualState => {
    this.setState({
      alreadyExecuted: true,
      published: actualState === "PUBLISHED" ? true : false,
      state: actualState,
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
                    <>
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
                    </>
                    {/* <VideoListStyle>Videos</VideoListStyle>
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
                    ))} */}
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

export default Update;
export { SINGLE_COURSE_QUERY };

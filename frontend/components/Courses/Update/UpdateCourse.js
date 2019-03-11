import React, { Component } from "react";
import Form from "../../styles/Form";
import gql from "graphql-tag";
import Error from "../../ErrorMessage";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import VideoItem from "../../VideoItem";
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
          title
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
      button {
        margin-right: 10px;
        width: auto;
        background: red;
        color: white;
        border: 0;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
      }
    }
  }
  img {
    max-height: 200px;
  }

  a {
    margin-top: 25px;
    margin-left: 20px;
    color: black;
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
  state = { showVideos: false };

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
  showVideos = e => {
    e.preventDefault();
    this.setState({ showVideos: true });
  };
  render() {
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_COURSE_MUTATION} variables={this.state}>
              {(updateCourse, { loading, error }) => (
                <>
                  <CourseContainer>
                    <div className="video-bar">
                      <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
                    </div>
                    <div className="info-bar">
                      <Form onSubmit={e => this.updateCourse(e, updateCourse)}>
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
                      </Form>
                    </div>
                  </CourseContainer>
                  <VideoListStyle>Videos</VideoListStyle>
                  {data.course.videos.map((video, index) => (
                    <VideoItem videos={video} data={index} key={video.video.id}>
                      <RemoveVideoButton
                        courseId={data.course.id}
                        id={video.video.id}
                      />
                    </VideoItem>
                  ))}
                </>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateCourse;
export { SINGLE_COURSE_QUERY, CourseContainer };

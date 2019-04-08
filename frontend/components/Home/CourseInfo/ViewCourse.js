import gql from "graphql-tag";
import React, { Component } from "react";
import { Query } from "react-apollo";
import Markdown from "react-markdown";
import styled from "styled-components";
import CommentForm from "./Comments/CommentForm";
import ListComments from "./Comments/ListComments";
import Overview from "./Overview";
import VideoItem from "./VideoItem";
import SimpleUser from "../../Authentication/SimpleUser";
import { isFunction, validate } from "@babel/types";

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
      user {
        id
        name
      }
      videos {
        video {
          id
          title
          description
          file
          state
          createdAt
        }
      }
    }
  }
`;
const CHECK_RATE_COURSE_QUERY = gql`
  query CHECK_RATE_COURSE_QUERY($courseId: ID!) {
    checkUserRated(courseId: $courseId) {
      message
    }
  }
`;

const CourseContainer = styled.div`
  display: grid;
  color: white;
  display: flex;
  background: #333350;
  padding: 20px 0px;

  .info-bar {
    min-height: 50px;
    flex: 2;
    order: 2;
    padding-left: 25px;
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
    text-align: right;
    flex: 1;
    order: 1;
    float: left;
  }
  button {
    width: auto;
    background: red;
    color: white;
    border: 0;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
`;
const Bar = styled.div`
  text-align: center;
  padding: 8px 0px;
  button {
    width: auto;
    background: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid red;
    }

    &:active {
      border-bottom: 3px solid red;
    }
  }
`;

class ViewCourse extends Component {
  state = {
    view: 1
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  render() {
    return (
      <SimpleUser>
        {({ data: { me } }) => {
          return (
            <Query
              query={SINGLE_COURSE_QUERY}
              variables={{ id: this.props.id }}
            >
              {({ data, loading, error }) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p>Error</p>;
                if (!data.course) {
                  return <p>No Courses Found for {this.props.id}</p>;
                }
                const { course } = data;
                if (course.id) {
                  return (
                    <Query
                      query={CHECK_RATE_COURSE_QUERY}
                      variables={{ courseId: course.id }}
                    >
                      {({ data, error, loading }) => {
                        if (loading) return <p>Loading</p>;
                        if (error) return <p>Error</p>;
                        console.log(
                          "data.checkUserRated.message",
                          data.checkUserRated.message
                        );
                        let showForm = data.checkUserRated.message;

                        console.log(showForm, "primeiro");

                        return (
                          <>
                            <CourseContainer>
                              <div className="video-bar">
                                <img src={course.thumbnail} />
                              </div>
                              <div className="info-bar">
                                <h2>{course.title}</h2>
                                <br />
                                <button>Go to the Video 1</button>
                              </div>
                            </CourseContainer>
                            <Bar>
                              <button id="1" onClick={this.changeView}>
                                Overview
                              </button>
                              <button id="2" onClick={this.changeView}>
                                Course Content
                              </button>
                              <button id="3" onClick={this.changeView}>
                                Review
                                {this.state.key}
                                {data.checkUserRated.message}
                              </button>
                            </Bar>
                            {this.state.view === 1 && (
                              <Overview data={course} key={course.id} />
                            )}
                            {this.state.view === 2 &&
                              data.course.videos !== null &&
                              data.course.videos.map((video, index) => (
                                <VideoItem
                                  videos={video}
                                  data={parseInt(index)}
                                  key={video.video.id}
                                />
                              ))}
                            {console.log(showForm)}
                            {this.state.view === 3 && (
                              <>
                                {showForm === "true" && me ? (
                                  <CommentForm data={course} />
                                ) : (
                                  <></>
                                )}

                                <ListComments data={course} />
                              </>
                            )}
                          </>
                        );
                      }}
                    </Query>
                  );
                }
              }}
            </Query>
          );
        }}
      </SimpleUser>
    );
  }
}

export default ViewCourse;
export { CHECK_RATE_COURSE_QUERY, SINGLE_COURSE_QUERY };

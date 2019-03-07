import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Overview from "./Overview";
import VideoItem from "../VideoItem";
import Markdown from "react-markdown";
import CommentForm from "./CommentForm";
import ListComments from "./ListComments";

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
        name
      }
      videos {
        video {
          id
          title
          description
          state
          category {
            name
          }
          thumbnail
          createdAt
        }
      }
    }
  }
`;

const CourseContainer = styled.div`
  border: 1px solid red;
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
  }
`;

const List = styled.div`
  display: inline;
  max-width: 1400px;
  margin: 40px auto 0 auto;

  .call-out {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 30%;
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
      <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {this.props.id}</p>;
          const { course } = data;
          console.log(course);
          return (
            <>
              <CourseContainer>
                <div className="video-bar">
                  <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
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
                  Comments
                </button>
              </Bar>

              {this.state.view === 1 && <Overview data={course} />}
              {this.state.view === 2 &&
                data.course.videos.map((video, index) => (
                  <>
                    <VideoItem videos={video} data={index} key={video.id} />
                  </>
                ))}
              {this.state.view === 3 && (
                <>
                  <CommentForm data={course} />
                  <ListComments data={course} />
                </>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default ViewCourse;

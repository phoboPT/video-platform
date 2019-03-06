import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Overview from "./Overview";

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
    }
  }
`;

const CourseContainer = styled.div`
  display: columuns;
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
    &:hover {
      border-bottom: 3px solid red;
    }
  }
`;

class ViewCourse extends Component {
  render() {
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {this.props.id}</p>;
          const { course } = data;
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
                <button>Overview</button>
              </Bar>
              <Overview data={course} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default ViewCourse;

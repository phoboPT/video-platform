import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "./CourseItem";
import Search from "./SearchCourse";

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY {
    courses {
      id
      title
      description
      thumbnail
      createdAt
      price
    }
  }
`;

const Center = styled.div`
  text-align: center;
  height: 250px;
`;
const CoursesList = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-top: 4rem;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;
export class Courses extends Component {
  render() {
    return (
      <Center>
        <p>Courses</p>
        <Query query={ALL_COURSES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <>
                <Search />
                <CoursesList>
                  {data.courses.map(course => (
                    <Course course={course} key={course.id} />
                  ))}
                </CoursesList>
              </>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Courses;
export { ALL_COURSES_QUERY };

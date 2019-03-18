import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import CourseItem from "./CourseItem";
import Pagination from "./Pagination";
import { perPageCourse } from "../../../config";

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY($skip: Int = 0, $first: Int = ${perPageCourse}) {
    courses(first: $first, skip: $skip) {
      id
      title
      description
      thumbnail
      createdAt
      price
      user {
        name
      }
    }
  }
`;

//interests query

//orderby query

const ALL_COURSES_ORDERED = gql`
  query ALL_COURSES($skip: Int = 0, $first: Int = ${perPageCourse} ) {
    courses(first: $first, skip: $skip ,orderBy: createdAt_DESC) {
      id
      title
      description
      thumbnail
      createdAt
      price
      user {
        name
      }
    }
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-top: 4rem;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;

export class Courses extends Component {
  componentWillMount() {
    switch (this.props.query) {
      case "ALL_COURSES_QUERY": {
        this.setState({ query: ALL_COURSES_QUERY, title: "ALL COURSES" });

        break;
      }
      case "ALL_COURSES": {
        this.setState({ query: ALL_COURSES_ORDERED, title: "By Creation" });
        break;
      }

      default: {
        this.setState({ query: ALL_COURSES_QUERY });
        break;
      }
    }
  }
  state = {
    page: 1,
    query: ALL_COURSES_QUERY,
    title: ""
  };
  saveState = () => {
    this.setState({ page: this.state.page + 1 });
  };

  saveState1 = () => {
    this.setState({ page: this.state.page - 1 });
  };
  render() {
    return (
      <>
        <p>{this.state.title}</p>
        <Query
          query={this.state.query}
          variables={{
            skip: this.state.page * perPageCourse - perPageCourse
          }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <>
                <CoursesList>
                  {data.courses.map(course => (
                    <CourseItem course={course} key={course.id} />
                  ))}
                </CoursesList>
                <Pagination
                  page={this.state.page}
                  saveState={this.saveState}
                  saveState1={this.saveState1}
                />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Courses;
export { ALL_COURSES_QUERY };
export { ALL_COURSES_ORDERED };

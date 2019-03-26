import { timingSafeEqual } from "crypto";
import gql from "graphql-tag";
import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPageCourse } from "../../../config";
import { Container, CoursesList, Title } from "../../styles/Home";
import CourseItem from "./CourseItem";
import Pagination from "./Pagination";

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
const ALL_COURSE_INTERESTS = gql`
  query ALL_COURSE_INTERESTS($skip: Int = 0, $first: Int = ${perPageCourse} ) {
    coursesUserInterestList(first: $first, skip: $skip ) {
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

export class Courses extends Component {
  componentWillMount() {
    switch (this.props.query) {
      case "ALL_COURSE_INTERESTS": {
        this.setState({
          query: ALL_COURSE_INTERESTS,
          title: "Interests List",
        });
        break;
      }
      case "ALL_COURSES_ORDERED": {
        this.setState({
          query: ALL_COURSES_ORDERED,
          title: "By Creation List",
        });
        break;
      }
      case "ALL_COURSES_QUERY": {
        this.setState({
          query: ALL_COURSES_QUERY,
          title: "All Courses List",
        });
        break;
      }

      default: {
        this.setState({ query: ALL_COURSES_QUERY });
        break;
      }
    }
  }
  state = {
    classe: "",
    page: 1,
    query: ALL_COURSES_QUERY,
    title: "",
  };
  saveState = () => {
    this.setState({ classe: "animation" });
    setTimeout(() => {
      this.setState({ page: this.state.page + 1 });
    }, 600);

    setTimeout(() => {
      this.setState({ classe: "" });
    }, 1000);
  };

  saveState1 = () => {
    this.setState({ classe: "animation" });
    setTimeout(() => {
      this.setState({ page: this.state.page - 1 });
    }, 600);

    setTimeout(() => {
      this.setState({ classe: "" });
    }, 1000);
  };

  render() {
    return (
      <>
        <Query
          query={this.state.query}
          variables={{
            skip: this.state.page * perPageCourse - perPageCourse,
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
                <Container>
                  <Title>{this.state.title}</Title>
                  {/* Filtering the data to show the correct list */}
                  <CoursesList className={this.state.classe}>
                    {data.courses &&
                      data.courses.map(course => (
                        <CourseItem course={course} key={course.id} />
                      ))}

                    {data.coursesUserInterestList &&
                      data.coursesUserInterestList.map(course => (
                        <CourseItem course={course} key={course.id} />
                      ))}
                  </CoursesList>

                  <Pagination
                    page={this.state.page}
                    saveState={this.saveState}
                    saveState1={this.saveState1}
                  />
                </Container>
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

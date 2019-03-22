import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CourseItem from "./CourseItem";
import Pagination from "./Pagination";
import { perPageCourse } from "../../../config";
import { Title, Container, CoursesList } from "../../styles/Home";

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERYfalse($skip: Int = 0, $first: Int = ${perPageCourse}) {
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
      case "ALL_COURSES_QUERY": {
        this.setState({
          query: ALL_COURSES_QUERY,
          title: "All Courses List"
        });
        break;
      }
      case "ALL_COURSES_ORDERED": {
        this.setState({
          query: ALL_COURSES_ORDERED,
          title: "By Creation List"
        });
        break;
      }
      case "ALL_COURSE_INTERESTS": {
        this.setState({
          query: ALL_COURSE_INTERESTS,
          title: "Interests List"
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
    page: 1,
    query: ALL_COURSES_QUERY,
    title: "",
    classe: ""
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
        <Title>{this.state.title}</Title>
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
              <Container>
                <CoursesList className={this.state.classe}>
                  {data.courses.map(course => (
                    <CourseItem course={course} key={course.id} />
                  ))}
                </CoursesList>

                <Pagination
                  page={this.state.page}
                  saveState={this.saveState}
                  saveState1={this.saveState1}
                />
              </Container>
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

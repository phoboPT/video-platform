import gql from "graphql-tag";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { perPageCourse } from "../../../config";
import { Container, CoursesList, Title } from "../../styles/Home";
import CourseItem from "./CourseItem";
import CourseItemNoUser from "./CourseItemNoUser";
import Pagination from "./Pagination";

const RENDER_QUERY = gql`
  query RENDER_QUERY {
    render @client
  }
`;

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY(
          $skip: Int = 0, $first: Int = ${perPageCourse}, $orderBy: String = "title_ASC") {
           coursesList(first: $first, skip: $skip,orderBy: $orderBy ,) {
      id
      title
      description
      thumbnail
      createdAt
      price
      totalComments
      totalRate
      user {
        id
        name
             }
      wished
    }
  }
`;

const ALL_COURSES_NOUSER = gql`
  query ALL_COURSES_NOUSER($skip: Int = 0, $first: Int = ${perPageCourse} ) {
           courses(first: $first, skip: $skip ,orderBy: title_ASC) {
      id
      title
      description
      thumbnail
      createdAt
      price
      totalComments
      totalRate
      user {
        id
        name
             }
    }
  }
`;

const ALL_COURSES_ORDERED_NOUSER = gql`
  query ALL_COURSES_ORDERED_NOUSER($skip: Int = 0, $first: Int = ${perPageCourse}  ) {
    courses(first: $first, skip: $skip ,orderBy: createdAt_DESC) {
        id
        title
        description
        thumbnail
        createdAt
        price
        totalComments
        user {
          id
          name
        }
        wished
        totalRate
      }
    }
`;
//orderby query

const ALL_COURSES_ORDERED = gql`
  query ALL_COURSES_ORDERED($skip: Int = 0, $first: Int = ${perPageCourse} $orderBy: String = "createdAt_DESC") {
    coursesList(first: $first, skip: $skip ,orderBy: $orderBy) {
             id
      title
      description
      thumbnail
      createdAt
      price
totalComments
totalRate
      user {
        id
        name
        }
        wished
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
      totalComments
      price
      totalRate
      user {
        id
        name
      }
      count
      wished
    }
  }
`;

export class ListAllCourses extends Component {
  componentWillMount() {
    switch (this.props.query) {
      case "ALL_COURSE_INTERESTS": {
        this.setState({
          query: ALL_COURSE_INTERESTS,
          title: "Interests List",
        });
        break;
      }
      case "ALL_COURSES_NOUSER": {
        this.setState({
          query: ALL_COURSES_NOUSER,
          title: "All Courses List",
        });
        break;
      }
      case "ALL_COURSES_ORDERED_NOUSER": {
        this.setState({
          query: ALL_COURSES_ORDERED_NOUSER,
          title: "By Creation List",
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
    count: 0,
    page: 1,
    query: ALL_COURSES_QUERY,
    title: "",
  };

  animationSliderControlForward = () => {
    this.setState({ classe: "animation" });
    setTimeout(() => {
      this.setState({ page: this.state.page + 1 });
    }, 600);

    setTimeout(() => {
      this.setState({ classe: "" });
    }, 1000);
  };

  animationSliderControlBackward = () => {
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
            published: "PUBLISHED",
            skip: this.state.page * perPageCourse - perPageCourse,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }

            if (data.courses) {
              return (
                <Container>
                  {data.courses && <Title>{this.state.title}</Title>}
                  <CoursesList className={this.state.classe}>
                    {data.courses &&
                      data.courses.map(course => (
                        <CourseItemNoUser
                          order={this.props.order}
                          course={course}
                          key={course.id}
                          skip={this.state.page * perPageCourse - perPageCourse}
                        />
                      ))}
                  </CoursesList>
                  <Pagination
                    page={this.state.page}
                    animationSliderControlForward={
                      this.animationSliderControlForward
                    }
                    animationSliderControlBackward={
                      this.animationSliderControlBackward
                    }
                    isInterest={false}
                  />
                </Container>
              );
            }

            if (data.coursesList) {
              return (
                <Container>
                  {data.coursesList && <Title>{this.state.title}</Title>}
                  <CoursesList className={this.state.classe}>
                    {data.coursesList &&
                      data.coursesList.map(course => (
                        <CourseItem
                          order={this.props.order}
                          course={course}
                          key={course.id}
                          skip={this.state.page * perPageCourse - perPageCourse}
                        />
                      ))}
                  </CoursesList>
                  <Pagination
                    page={this.state.page}
                    animationSliderControlForward={
                      this.animationSliderControlForward
                    }
                    animationSliderControlBackward={
                      this.animationSliderControlBackward
                    }
                    isInterest={false}
                  />
                </Container>
              );
            }
            if (data.coursesUserInterestList)
              return (
                <>
                  <Container>
                    {data.coursesUserInterestList &&
                      (data.coursesUserInterestList[0] !== undefined && (
                        <Title>{this.state.title}</Title>
                      ))}
                    {/* Filtering the data to show the correct list */}
                    <CoursesList className={this.state.classe}>
                      {data.coursesUserInterestList &&
                        data.coursesUserInterestList.map(course => (
                          <CourseItem
                            course={course}
                            key={course.id}
                            skip={
                              this.state.page * perPageCourse - perPageCourse
                            }
                          />
                        ))}
                    </CoursesList>

                    {/* Check what pagination to render ( count gives the total of items of the interest list) */}

                    {data.coursesUserInterestList[0] !== undefined && (
                      <Pagination
                        page={this.state.page}
                        animationSliderControlForward={
                          this.animationSliderControlForward
                        }
                        animationSliderControlBackward={
                          this.animationSliderControlBackward
                        }
                        isInterest={true}
                        count={
                          data.coursesUserInterestList
                            ? data.coursesUserInterestList[0].count
                            : 0
                        }
                      />
                    )}
                  </Container>
                </>
              );
          }}
        </Query>
      </>
    );
  }
}

export default ListAllCourses;
export {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_NOUSER,
  ALL_COURSES_ORDERED,
  ALL_COURSES_ORDERED_NOUSER,
  ALL_COURSES_QUERY,
  RENDER_QUERY,
};

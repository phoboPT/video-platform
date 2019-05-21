import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPageCourse } from '../../../config';
import { Container, CoursesList, Title } from '../../styles/Home';
import CourseItem from './CourseItem';
import CourseItemNoUser from './CourseItemNoUser';
import Pagination from './Pagination';
import Error from '../../Static/ErrorMessage.js';
import Loading from '../../Static/Loading';

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
// orderby query

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
// interests query
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
// rating ordered query
const ALL_COURSES_RATING = gql`
  query ALL_COURSES_RATING($skip: Int = 0, $first: Int = ${perPageCourse} ) {
    coursesRating(first: $first, skip: $skip ) {
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

class ListAllCourses extends Component {
  state = {
    classe: '',
    page: 1,
    query: ALL_COURSES_QUERY,
    title: '',
  };

  componentWillMount() {
    switch (this.props.query) {
      case 'ALL_COURSE_INTERESTS': {
        this.setState({
          query: ALL_COURSE_INTERESTS,
          title: 'You May be Interested In...',
        });
        break;
      }
      case 'ALL_COURSES_NOUSER': {
        this.setState({
          query: ALL_COURSES_NOUSER,
          title: 'All Courses',
        });
        break;
      }
      case 'ALL_COURSES_ORDERED_NOUSER': {
        this.setState({
          query: ALL_COURSES_ORDERED_NOUSER,
          title: 'More Recent',
        });
        break;
      }
      case 'ALL_COURSES_ORDERED': {
        this.setState({
          query: ALL_COURSES_ORDERED,
          title: 'More Recent',
        });
        break;
      }
      case 'ALL_COURSES_QUERY': {
        this.setState({
          query: ALL_COURSES_QUERY,
          title: 'All Courses ',
        });
        break;
      }
      case 'ALL_COURSES_RATING': {
        this.setState({
          query: ALL_COURSES_RATING,
          title: 'Popular ',
        });
        break;
      }

      default: {
        this.setState({ query: ALL_COURSES_QUERY });
        break;
      }
    }
  }

  animationSliderControlForward = () => {
    this.setState({ classe: 'animation' });
    setTimeout(() => {
      this.setState({ page: this.state.page + 1 });
    }, 600);

    setTimeout(() => {
      this.setState({ classe: '' });
    }, 1000);
  };

  animationSliderControlBackward = () => {
    this.setState({ classe: 'animation' });
    setTimeout(() => {
      this.setState({ page: this.state.page - 1 });
    }, 600);

    setTimeout(() => {
      this.setState({ classe: '' });
    }, 1000);
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Query
          query={query}
          variables={{
            published: 'PUBLISHED',
            skip: this.state.page * perPageCourse - perPageCourse,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;

            if (error) return <Error error={error} />;

            if (!data) return <p>No Data</p>;

            if (data.courses) {
              return (
                <Container>
                  {data.courses && <Title>{this.state.title}</Title>}
                  <div id="content-container">
                    <CoursesList
                      id="courses-list"
                      className={this.state.classe}
                    >
                      {data.courses &&
                        data.courses.map(course => (
                          <CourseItemNoUser
                            course={course}
                            key={course.id}
                            skip={
                              this.state.page * perPageCourse - perPageCourse
                            }
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
                  </div>
                </Container>
              );
            }

            if (data.coursesList) {
              return (
                <Container>
                  {data.coursesList && <Title>{this.state.title}</Title>}
                  <div id="content-container">
                    <CoursesList
                      id="courses-list"
                      className={this.state.classe}
                    >
                      {data.coursesList &&
                        data.coursesList.map(course => (
                          <CourseItem
                            course={course}
                            key={course.id}
                            skip={
                              this.state.page * perPageCourse - perPageCourse
                            }
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
                  </div>
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
                    <div id="content-container">
                      <CoursesList
                        id="courses-list"
                        className={this.state.classe}
                      >
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
                          isInterest
                          count={
                            data.coursesUserInterestList
                              ? data.coursesUserInterestList[0].count
                              : 0
                          }
                        />
                      )}
                    </div>
                  </Container>
                </>
              );
            if (data.coursesRating) {
              return (
                <>
                  <Container>
                    {data.coursesRating &&
                      (data.coursesRating[0] !== undefined && (
                        <Title>{this.state.title}</Title>
                      ))}
                    {/* Filtering the data to show the correct list */}
                    <div id="content-container">
                      <CoursesList
                        id="courses-list"
                        className={this.state.classe}
                      >
                        {data.coursesRating &&
                          data.coursesRating.map(course => (
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

                      {data.coursesRating[0] !== undefined && (
                        <Pagination
                          page={this.state.page}
                          animationSliderControlForward={
                            this.animationSliderControlForward
                          }
                          animationSliderControlBackward={
                            this.animationSliderControlBackward
                          }
                          count={
                            data.coursesRating ? data.coursesRating[0].count : 0
                          }
                        />
                      )}
                    </div>
                  </Container>
                </>
              );
            }
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
  ALL_COURSES_RATING,
  RENDER_QUERY,
};

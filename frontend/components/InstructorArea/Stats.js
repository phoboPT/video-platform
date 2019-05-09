/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CourseByDate from './Graphs/CourseByDate';
import AllCourses from './Graphs/AllCourses';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    coursesStats {
      id
      count
      createdAt
      course {
        title
      }
      user {
        id
      }
    }
  }
`;

const COURSE_SELL_BY_TIME = gql`
  query COURSE_SELL_BY_TIME($id: ID) {
    sellsByCourse(id: $id) {
      id
      count
      createdAt
      course {
        title
      }
      user {
        id
      }
    }
  }
`;
class Stats extends Component {
  componentWillMount() {
    switch (this.props.query) {
      case 'CURRENT_USER_QUERY': {
        this.setState({
          query: CURRENT_USER_QUERY,
          view: parseInt(1),
        });
        break;
      }
      case 'COURSE_SELL_BY_TIME': {
        this.setState({
          query: COURSE_SELL_BY_TIME,
          view: parseInt(2),
        });
        break;
      }

      default: {
        this.setState({ query: CURRENT_USER_QUERY });
        break;
      }
    }
  }

  render() {
    const { query, variables, view } = this.state;
    const { courseId } = this.props;
    console.log(courseId);
    return (
      <>
        {view === 1 && (
          <Query query={query}>
            {({ data }) => (
              <>
                {console.log(data)}
                <div>
                  <AllCourses
                    chartData={data}
                    location="All Courses"
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                    id={this.props.id}
                  />
                </div>
              </>
            )}
          </Query>
        )}
        {view === 2 && (
          <Query query={query} variables={{ id: courseId }}>
            {({ data }) => (
              <>
                {console.log(data)}
                <div>
                  <CourseByDate
                    chartData={data}
                    location="All Courses"
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                    id={this.props.id}
                  />
                </div>
              </>
            )}
          </Query>
        )}
      </>
    );
  }
}

export default Stats;

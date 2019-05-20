/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CourseByDate from './Graphs/CourseByDate';
import AllCourses from './Graphs/AllCourses';
import AllByDay from './Graphs/AllByDay';
import Loading from '../Static/Loading';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    coursesStats {
      id
      count
      createdAt
      course {
        id
        title
      }
      user {
        id
      }
    }
  }
`;
const ALL_BY_DATE = gql`
  query ALL_BY_DATE($initialDate: String) {
    coursesStatsByDate(initialDate: $initialDate) {
      id
      count
      createdAt
      course {
        id
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
        id
        title
      }
      user {
        id
      }
    }
  }
`;

const LoadStyle = styled.div`
  margin: auto;
  width: 300px;
  height: 200px;
`;

const Dooted = styled.div`
  border: 1px dotted red;
`;
class Stats extends Component {
  async componentWillMount() {
    const { query } = this.props;

    switch (query) {
      case 'CURRENT_USER_QUERY': {
        await this.setState({
          query: CURRENT_USER_QUERY,
          view: parseInt(1),
        });
        break;
      }
      case 'COURSE_SELL_BY_TIME': {
        await this.setState({
          query: COURSE_SELL_BY_TIME,
          view: parseInt(2),
        });
        break;
      }
      case 'ALL_BY_DATE': {
        await this.setState({
          query: ALL_BY_DATE,
          view: parseInt(3),
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
    const { query, view } = this.state;
    const { courseId, date } = this.props;
    return (
      <>
        {view === 1 && (
          <Query query={query}>
            {({ data, loading }) => {
              if (loading)
                return (
                  <LoadStyle>
                    <Loading />
                  </LoadStyle>
                );
              if (!data) return null;
              if (data)
                return (
                  <Dooted>
                    <AllCourses
                      chartData={data}
                      location="All Courses"
                      legendPosition="top"
                      displayTitle="Hello"
                      label="Total Courses Selled"
                      width={700}
                      height={400}
                    />
                  </Dooted>
                );
            }}
          </Query>
        )}
        {view === 2 && (
          <Query query={query} variables={{ id: courseId }}>
            {({ data, loading }) => {
              if (loading)
                return (
                  <LoadStyle>
                    <Loading />
                  </LoadStyle>
                );
              if (!data) {
                return (
                  <CourseByDate
                    empty
                    location=""
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                  />
                );
              }
              if (data)
                return (
                  <Dooted>
                    <CourseByDate
                      chartData={data}
                      location=""
                      legendPosition="top"
                      displayTitle="Hello"
                      label="Total Courses Selled"
                      width={700}
                      height={400}
                    />
                  </Dooted>
                );
            }}
          </Query>
        )}
        {view === 3 && (
          <Query query={query} variables={{ initialDate: date }}>
            {({ data, loading }) => {
              if (loading)
                return (
                  <LoadStyle>
                    <Loading />
                  </LoadStyle>
                );
              if (!data) {
                return (
                  <AllByDay
                    empty
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                  />
                );
              }
              if (data)
                return (
                  <Dooted>
                    <AllByDay
                      chartData={data}
                      legendPosition="top"
                      displayTitle="Hello"
                      label="All Courses By Date"
                      width={700}
                      height={400}
                    />
                  </Dooted>
                );
            }}
          </Query>
        )}
      </>
    );
  }
}
Stats.propTypes = {
  courseId: PropTypes.string,
  query: PropTypes.string.isRequired,
  date: PropTypes.string,
};
export default Stats;

export { CURRENT_USER_QUERY };

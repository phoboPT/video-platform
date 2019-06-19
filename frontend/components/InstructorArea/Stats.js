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
import count from '../../lib/countCoursesSells';

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
  border: 2px solid #2f3c51;
  padding: 2rem;
  #title {
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
  }
  #date {
    display: flex;
    img {
      margin-right: 5px;
      width: 35px;
      height: 35px;
    }
    input {
      height: 35px;
      background: #f7f7f7;
      border: none;
      padding-left: 2rem;
      font-size: 15px;
      -moz-box-shadow: 0 0 4px #ccc;
      -webkit-box-shadow: 0 0 4px #ccc;
      box-shadow: 0 0 4px #ccc;
    }
  }
  .custom-style {
    div {
      font-size: 12px;
    }
    button {
      border-right-width: 1.3rem;
      border-left-width: 1.3rem;
      height: 12px;
    }

    .react-datepicker__current-month {
      padding-bottom: 5px;
    }
    .react-datepicker__header {
      padding-left: 10px;
      width: 220px;
    }
    .react-datepicker__month {
      padding-left: 10px;
    }
    .react-datepicker__day,
    .react-datepicker__day-name {
      margin-right: 10px;
    }
  }
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
              if (data.coursesStats.length === 0)
                return (
                  <Dooted>
                    <p id="title">All time Stats</p>
                    <AllCourses
                      empty
                      location="All Courses"
                      legendPosition="bottom"
                      displayTitle="Hello"
                      label="Total Courses Selled"
                      width={700}
                      height={400}
                    />
                    <p>Total Sells: {count(data)}</p>
                  </Dooted>
                );

              if (data.coursesStats.length > 0)
                return (
                  <Dooted>
                    <AllCourses
                      chartData={data}
                      location="All Courses"
                      legendPosition="bottom"
                      displayTitle="Hello"
                      label="Total Courses Selled"
                      width={700}
                      height={400}
                    />
                    <p>Total Sells: {count(data)}</p>
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
              if (data.sellsByCourse.length === 0) {
                return (
                  <CourseByDate
                    empty
                    chartData={data}
                    location=""
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                  />
                );
              }
              if (data.sellsByCourse.length > 0)
                return (
                  <CourseByDate
                    chartData={data}
                    location=""
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                  />
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
              if (data.coursesStatsByDate.length === 0) {
                return (
                  <AllByDay
                    empty
                    chartData={data}
                    legendPosition="top"
                    displayTitle="Hello"
                    label="Total Courses Selled"
                    width={700}
                    height={400}
                  />
                );
              }
              if (data.coursesStatsByDate.length > 0)
                return (
                  <AllByDay
                    chartData={data}
                    legendPosition="top"
                    displayTitle="Hello"
                    label="All Courses By Date"
                    width={700}
                    height={400}
                  />
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
export { Dooted };
export { CURRENT_USER_QUERY };

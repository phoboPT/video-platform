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
  .select-css {
    display: block;
    font-size: 13px;
    font-family: sans-serif;

    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 230px;
    margin: 0;
    box-shadow: 0 0 2px #ccc;
    border-radius: 0.5em;
    appearance: none;

    background-color: #ccc;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .select-css::-ms-expand {
    display: none;
  }
  .select-css:hover {
    border-color: #888;
  }
  .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .select-css option {
    font-weight: normal;
  }

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
                    <p id="title">All time Stats</p>
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

/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CourseByDate from './Graphs/CourseByDate';
import AllCourses from './Graphs/AllCourses';
import Loading from '../Static/Loading';

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

const LoadStyle = styled.div`
  margin: auto;
  width: 300px;
  height: 200px;
`;

const Dooted = styled.div`
  border: 1px dotted red;
`;
class Stats extends Component {
  componentWillMount() {
    const { query } = this.props;

    switch (query) {
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
    const { query, view } = this.state;
    const { courseId } = this.props;
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
                    location="All Courses"
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
      </>
    );
  }
}
Stats.propTypes = {
  courseId: PropTypes.string,
  query: PropTypes.string.isRequired,
};
export default Stats;

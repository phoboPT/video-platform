import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ItemList from '../styles/ItemList';
import CourseItemInstructor from './CourseItemInstructor';
import Loading from '../Static/Loading';
import Error from '../Static/ErrorMessage';
import { perPage } from '../../config';
import Pagination from './Pagination';

const CURRENT_COURSES_QUERY = gql`
  query CURRENT_COURSES_QUERY ($skip: Int = 0, $first: Int = ${perPage},) {
    coursesUser(first: $first, skip: $skip) {
      id
      title
      description
      thumbnail
      state
      createdAt
      price
      category {
        id
        name
      }
      videos {
        id
        video {
          title
          file
          createdAt
        }
      }
    }
  }
`;

class MyCourses extends Component {
  state = {
    page: 1,
  };

  Forward = () => {
    const { page } = this.state;

    this.setState({ page: page + 1 });
  };

  Backward = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  };

  render() {
    const { page } = this.state;
    return (
      <Query
        query={CURRENT_COURSES_QUERY}
        variables={{
          skip: page * perPage - perPage,
        }}
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (!data) return <p>No Data</p>;
          if (data.coursesUser) {
            return (
              <>
                <Pagination
                  page={page}
                  Forward={this.Forward}
                  Backward={this.Backward}
                />
                <ItemList>
                  {data.coursesUser.map(course => (
                    <CourseItemInstructor course={course} key={course.id} />
                  ))}
                </ItemList>
              </>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default MyCourses;
export { CURRENT_COURSES_QUERY };

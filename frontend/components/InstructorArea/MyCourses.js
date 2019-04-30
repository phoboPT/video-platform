import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ItemList from '../styles/ItemList';
import CourseItemInstructor from './CourseItemInstructor';

const CURRENT_COURSES_QUERY = gql`
  query CURRENT_COURSES_QUERY {
    coursesUser {
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
  render() {
    const { changeView } = this.props;
    return (
      <Query query={CURRENT_COURSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;

          if (error) return <p>Error:{error.message}</p>;
          if (data.coursesUser) {
            return (
              <>
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

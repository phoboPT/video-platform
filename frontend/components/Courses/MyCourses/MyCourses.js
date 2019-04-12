import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import ItemList from '../../styles/ItemList';
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
          description
          state
          file
          createdAt
        }
      }
    }
  }
`;
const AddButon = styled.div`
  padding-bottom: 25px;
  button {
    border: none !important;
    background: none;
    float: left;
  }
  button:focus {
    outline: none;
  }
  input:focus {
    outline: none;
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
                <AddButon>
                  <button
                    type="button"
                    id="2"
                    onClick={() => {
                      changeView(2);
                    }}
                  >
                    <input
                      type="image"
                      src="../../../static/addButton.png"
                      alt="Submit"
                      width="48"
                      height="48"
                    />
                  </button>
                </AddButon>
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

import gql from "graphql-tag";
import React, { Component } from "react";
import { Query } from "react-apollo";
import ItemList from "../../styles/ItemList";
import CourseItem from "./CourseItem";

import Section from "../../DragNDrop/Draggable/Section";
import Container from "../../DragNDrop/Droppable/Container";
import Teste from "../../DragNDrop/teste";

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

class MyCourses extends Component {
  render() {
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
                    <CourseItem course={course} key={course.id} update={true} />
                  ))}
                </ItemList>
                <Container>
                  <Teste />
                </Container>
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

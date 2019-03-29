import React, { Component } from "react";
import styled from "styled-components";
import orderCourse from "../../../lib/orderCourses";
import ItemList from "../../styles/ItemList";
import CourseItem from "./CourseItem";
import FilterCategory from "./Filters/FilterCategory";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const COURSES_QUERY = gql`
  query COURSES_QUERY($category: ID) {
    categoryFilter(category: $category) {
      course {
        id
        title
        thumbnail
        state
        createdAt
        category {
          id
          name
        }
      }
    }
  }
`;

const Bar = styled.div`
  text-align: center;
  padding: 8px 0px;
  background: #333350;

  button {
    width: auto;
    color: white;
    background: none;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid red;
    }

    &:active {
      border-bottom: 3px solid red;
    }
  }
`;
const Container = styled.div`
  .teste {
    color: #515151;
    &:hover {
      cursor: pointer;
      color: #2d2d2d;
    }

    &:disabled {
      color: #d1d1d1;
      cursor: not-allowed;
    }
  }
`;

class UserCourses extends Component {
  state = {
    view: 1,
    category: "a",
    author: "a",
    isDisabled: true
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  changeCategory = categoryId => {
    this.setState({ category: categoryId, isDisabled: false });
  };

  reset = e => {
    let selectBox = document.getElementById("category");
    selectBox.value = "a";
    this.setState({ category: "a", isDisabled: true });
  };

  render() {
    return (
      <Query
        query={COURSES_QUERY}
        variables={{ category: this.state.category }}
      >
        {({ data, loading }) => {
          if (data) {
            let courses = [];
            courses = orderCourse(data.categoryFilter);

            return (
              <>
                <Bar>
                  <div className="info-bar">
                    <button id={1} onClick={this.changeView}>
                      My Courses
                    </button>
                    <button id={2} onClick={this.changeView}>
                      Whish List
                    </button>
                  </div>
                </Bar>
                {this.state.view === 1 && (
                  <Container>
                    <FilterCategory
                      changeCategory={this.changeCategory}
                      state={"a"}
                    />
                    <button
                      disabled={this.state.isDisabled}
                      className="teste"
                      onClick={this.reset}
                    >
                      Reset
                    </button>
                    <ItemList>
                      {courses.map(course => {
                        return (
                          <CourseItem
                            course={course.course}
                            key={course.course.id}
                            update={false}
                          />
                        );
                      })}
                    </ItemList>
                  </Container>
                )}
                {this.state.view === 2 && <p>Wishlist</p>}
              </>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default UserCourses;

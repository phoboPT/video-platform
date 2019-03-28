import React, { Component } from "react";
import styled from "styled-components";
import orderCourse from "../../../lib/orderCourses";
import User from "../../Authentication/User";
import ItemList from "../../styles/ItemList";
import CourseItem from "./CourseItem";
import FilterCategory from "./Filters/FilterCategory";
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
const Container = styled.div``;

class UserCourses extends Component {
  state = { view: 1 };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          let courses = [];
          courses = orderCourse(me.courses);
          if (me && courses) {
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
                    <FilterCategory />
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
      </User>
    );
  }
}

export default UserCourses;

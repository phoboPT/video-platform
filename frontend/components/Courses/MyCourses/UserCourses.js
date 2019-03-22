import React, { Component } from "react";
import styled from "styled-components";
import orderCourse from "../../../lib/orderCourses";
import User from "../../Authentication/User";
import ItemList from "../../styles/ItemList";
import CourseItem from "./CourseItem";

const Container = styled.div`
  display: grid;
  color: white;
  display: flex;
  background: #333350;
  padding: 20px 0px;
  border: 1px solid red;

  .info-bar {
    border: 1px solid black;
    min-height: 50px;
    flex: 2;
    order: 2;
    padding-left: 25px;
  }
  img {
    max-height: 200px;
  }

  a {
    margin-top: 25px;
    margin-left: 20px;
    color: black;
  }

  .video-bar {
    padding-right: 25px;
    text-align: right;
    flex: 1;
    order: 1;
    float: left;
  }
  button {
    width: auto;
    background: red;
    color: white;
    border: 0;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
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

class UserCourses extends Component {
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
                    <button>My Courses</button>
                    <button>Whish List </button>
                  </div>
                </Bar>

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

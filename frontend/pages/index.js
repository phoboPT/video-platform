import ListVideosInterest from "../components/Home/CoursesList/ListVideosInterest";
import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
import Search from "../components/Home/SearchCourse";

import React, { Component } from "react";
import User from "../../Authentication/User";

export class Home extends Component {
  render() {
    return (
      <User>
        <div>
          <Search />
          <ListAllCourses query="ALL_COURSES_QUERY" />
          <ListAllCourses query="ALL_COURSES_ORDERED" />
          <ListAllCourses query="ALL_COURSE_INTERESTS" />
        </div>
      </User>
    );
  }
}

export default Home;

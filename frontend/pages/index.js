import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
import ListVideosInterest from "../components/Home/CoursesList/ListVideosInterest";
import Search from "../components/Home/SearchCourse";

import React, { Component } from "react";
import User from "../components/Authentication/User";

export class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <ListAllCourses query="ALL_COURSES_QUERY" />
        <ListAllCourses query="ALL_COURSES_ORDERED" />
        {/* <ListAllCourses query="ALL_COURSE_INTERESTS" /> */}
      </div>
    );
  }
}

export default Home;

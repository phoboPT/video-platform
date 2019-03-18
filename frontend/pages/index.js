import ListVideosInterest from "../components/Home/CoursesList/ListVideosInterest";
import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
import Search from "../components/Home/SearchCourse";

import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <ListAllCourses query="ALL_COURSES_QUERY" />

        <ListAllCourses query="ALL_COURSES" />
      </div>
    );
  }
}

export default Home;

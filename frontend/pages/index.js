import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
import ListVideosInterest from "../components/Home/CoursesList/ListVideosInterest";
import Search from "../components/Home/SearchCourse";

import React, { Component } from "react";
import User from "../components/Authentication/User";

export class Home extends Component {
  render() {
    return (
      <div>
        <User>
          {({ data: { me } }) => {
            if (!me) return null;
            return (
              <>
                <Search />
                <ListAllCourses query="ALL_COURSES_QUERY" />
                <ListAllCourses query="ALL_COURSES_ORDERED" />
                {me.interests.length > 0 && (
                  <ListAllCourses query="ALL_COURSE_INTERESTS" />
                )}
              </>
            );
          }}
        </User>
      </div>
    );
  }
}

export default Home;

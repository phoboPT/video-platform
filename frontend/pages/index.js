import React, { Component } from "react";
import { Query } from "react-apollo";
import User from "../components/Authentication/User";
import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
import { RENDER_QUERY } from "../components/Home/CoursesList/ListAllCourses";
import Search from "../components/Home/SearchCourse";

export class Home extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me)
            return (
              <>
                <Search />

                <ListAllCourses query="ALL_COURSES_NOUSER" />
                <ListAllCourses query="ALL_COURSES_ORDERED_NOUSER" />
              </>
            );
          return (
            <>
              <Search />

              <ListAllCourses query="ALL_COURSES_QUERY" me />
              <ListAllCourses query="ALL_COURSES_ORDERED" />
              {/* {me.interests.length > 0 && (
                <ListAllCourses query="ALL_COURSE_INTERESTS" />
              )} */}
            </>
          );
        }}
      </User>
    );
  }
}

export default Home;
export { RENDER_QUERY };

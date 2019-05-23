import React, { Component } from 'react';
import User from '../components/Authentication/User';
import ListAllCourses, {
  RENDER_QUERY,
} from '../components/Home/CoursesList/ListAllCourses';
import Search from '../components/Home/Search';

class Home extends Component {
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
            <div key={me.id}>
              <Search />
              {me.interests.length > 0 && (
                <ListAllCourses query="ALL_COURSE_INTERESTS" />
              )}
              <ListAllCourses query="ALL_COURSES_QUERY" />
              <ListAllCourses query="ALL_COURSES_ORDERED" />
              <ListAllCourses query="ALL_COURSES_RATING" />
            </div>
          );
        }}
      </User>
    );
  }
}

export default Home;
export { RENDER_QUERY };

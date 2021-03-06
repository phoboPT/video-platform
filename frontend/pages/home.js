import React, { Component } from 'react';
import User from '../components/Authentication/User';
import ListAllCourses, {
  RENDER_QUERY,
} from '../components/Home/CoursesList/ListAllCourses';
import Search from '../components/Home/Search';
import Loading from '../components/Static/Loading';
import InitialPage from '../components/InitialPage';

class Home extends Component {
  render() {
    return (
      <User>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!data.me) {
            return <InitialPage />;
          }
          return (
            <div key={data.me.id}>
              <Search />
              {data.me.interests.length > 0 && (
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

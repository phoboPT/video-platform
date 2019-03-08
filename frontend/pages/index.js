import Link from "next/link";
import ListVideosInterest from "../components/CoursesList/ListVideosInterest";
import ListAllCourses from "../components/CoursesList/ListAllCourses";
const Home = props => (
  <div>
    <ListVideosInterest />
    <ListAllCourses />
  </div>
);

export default Home;

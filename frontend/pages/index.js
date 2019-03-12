import Link from "next/link";
import ListVideosInterest from "../components/Home/CoursesList/ListVideosInterest";
import ListAllCourses from "../components/Home/CoursesList/ListAllCourses";
const Home = props => (
  <div>
    <ListVideosInterest />
    <ListAllCourses />
  </div>
);

export default Home;

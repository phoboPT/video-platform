import Link from "next/link";
import ListVideosInterest from "../components/ListVideosInterest";
import ListAllCourses from "../components/Courses/ListAllCourses";
const Home = props => (
  <div>
    <ListVideosInterest />
    <ListAllCourses />
  </div>
);

export default Home;

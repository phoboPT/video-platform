import Link from "next/link";
import ListVideosInterest from "../components/ListVideosInterest";
import Courses from "../components/Courses";
const Home = props => (
  <div>
    <ListVideosInterest />
    <Courses />
  </div>
);

export default Home;

import Link from "next/link";
import CoursesPage from "../components/Courses/Courses";

const Courses = props => (
  <div>
    <CoursesPage page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Courses;

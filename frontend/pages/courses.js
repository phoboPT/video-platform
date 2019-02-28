import Courses from "../components/Courses/Courses";

const CoursesPage = props => (
  <div>
    <Courses page={parseFloat(props.query.page) || 1} />
  </div>
);

export default CoursesPage;

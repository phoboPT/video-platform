import ViewCourse from "../components/Courses/ViewCourse";

const ViewCoursePage = ({ query }) => (
  <div>
    <ViewCourse id={query.id} />
  </div>
);

export default ViewCoursePage;

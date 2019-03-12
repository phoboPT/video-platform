import ViewCourse from "../components/Home/CourseInfo/ViewCourse";

const ViewCoursePage = ({ query }) => (
  <div>
    <ViewCourse id={query.id} />
  </div>
);

export default ViewCoursePage;

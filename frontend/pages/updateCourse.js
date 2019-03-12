import UpdateCourse from "../components/Courses/MyCourses/Update/UpdateCourse";

const Update = ({ query }) => (
  <div>
    <UpdateCourse id={query.id} />
  </div>
);

export default Update;

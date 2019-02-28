import UpdateCourse from "../components/Courses/UpdateCourse";

const Update = ({ query }) => (
  <div>
    <UpdateCourse id={query.id} />
  </div>
);

export default Update;

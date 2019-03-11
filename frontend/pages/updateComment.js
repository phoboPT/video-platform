import UpdateComCourse from "../components/Courses/Comments/UpdateComment";

const Update = ({ query }) => (
  <div>
    <UpdateComCourse id={query.id} />
  </div>
);

export default Update;

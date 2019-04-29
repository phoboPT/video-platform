import UpdateCourse from '../components/InstructorArea/FormCourse/ChangeCourse';

const Update = ({ query }) => (
  <div>
    <UpdateCourse id={query.id} />
  </div>
);

export default Update;

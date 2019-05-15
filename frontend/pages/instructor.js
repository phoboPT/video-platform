import InstructorInfo from '../components/Home/CourseInfo/InstructorInfo';

const InstructorPage = ({ query }) => (
  <div>
    <InstructorInfo id={query.id} />
  </div>
);

export default InstructorPage;

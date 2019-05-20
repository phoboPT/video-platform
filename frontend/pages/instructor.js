import PropTypes from 'prop-types';
import InstructorInfo from '../components/Home/CourseInfo/InstructorInfo';

const InstructorPage = ({ query }) => (
  <div>
    <InstructorInfo id={query.id} />
  </div>
);

InstructorPage.propTypes = {
  query: PropTypes.string.isRequired,
};
export default InstructorPage;

import PropTypes from 'prop-types';
import Courses from '../components/Courses/Courses';

const CoursesPage = ({ query }) => (
  <div>
    <Courses query={query} />
  </div>
);

CoursesPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default CoursesPage;

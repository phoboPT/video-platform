import PropTypes from 'prop-types';
import ShowVideo from '../components/VideoManager/ShowVideo';

const Update = ({ query }) => (
  <div>
    <ShowVideo id={query.id} />
  </div>
);
Update.propTypes = {
  query: PropTypes.object.isRequired,
};
export default Update;

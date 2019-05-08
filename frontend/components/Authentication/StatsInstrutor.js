import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    coursesStats {
      id
      count
      course {
        title
      }
      user {
        id
      }
    }
  }
`;

const StatsInstrutor = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

StatsInstrutor.propTypes = {
  children: PropTypes.func.isRequired,
};

export default StatsInstrutor;
export { CURRENT_USER_QUERY };

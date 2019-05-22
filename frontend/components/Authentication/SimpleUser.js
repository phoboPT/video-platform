import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const SIMPLE_USER_QUERY = gql`
  query SIMPLE_USER_QUERY {
    me {
      id
      name
      email
      videoUser {
        videoItem {
          watched
          video {
            id
          }
        }
      }
    }
  }
`;

const SimpleUser = props => (
  <Query {...props} query={SIMPLE_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

SimpleUser.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SimpleUser;
export { SIMPLE_USER_QUERY };

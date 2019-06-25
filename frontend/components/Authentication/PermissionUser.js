import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const SIMPLE_USER_QUERY = gql`
  query SIMPLE_USER_QUERY {
    me {
      id
      name
      permission
    }
  }
`;

const PermissionUser = props => (
  <Query {...props} query={SIMPLE_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

PermissionUser.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PermissionUser;
export { SIMPLE_USER_QUERY };

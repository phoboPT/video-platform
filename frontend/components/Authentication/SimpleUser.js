import gql from "graphql-tag";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
    }
  }
`;

const SimpleUser = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

SimpleUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default SimpleUser;
export { CURRENT_USER_QUERY };

import gql from "graphql-tag";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      wishlist {
        course {
          id
        }
      }
      permission
      courses {
        course {
          id
          title
          thumbnail
          state
          createdAt
          category {
            name
          }
        }
      }
      cart {
        id
        course {
          id
          title
          price
          thumbnail
          category {
            name
          }
          user {
            name
          }
        }
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };

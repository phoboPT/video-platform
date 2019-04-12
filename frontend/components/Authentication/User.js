import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

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
      interests {
        id
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
            id
            name
          }
          user {
            id
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
            id
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

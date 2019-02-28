import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_COURSES_QUERY = gql`
  query {
    coursesUser {
      id
      title
      videos {
        id
        video {
          title
          description
          state
          category {
            name
          }
          thumbnail
          createdAt
        }
      }
    }
  }
`;

const UserCourses = props => (
  <Query {...props} query={CURRENT_COURSES_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

UserCourses.propTypes = {
  children: PropTypes.func.isRequired
};

export default UserCourses;
export { CURRENT_COURSES_QUERY };

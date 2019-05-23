import gql from 'graphql-tag';
import Router from 'next/router';
import { Mutation, withApollo } from 'react-apollo';
import { ALL_COURSES_NOUSER } from '../Home/CoursesList/ListAllCourses';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = ({ client }) => (
  <Mutation
    onCompleted={data => {
      if (data) {
        sessionStorage.clear(); // or localStorage
        client.resetStore().then(() => {
          client.resetStore();
          Router.push({
            pathname: '/',
          });
        });
      }
    }}
    mutation={SIGN_OUT_MUTATION}
  >
    {signout => (
      <button type="button" onClick={signout} tag="a">
        Sign Out
      </button>
    )}
  </Mutation>
);

export default withApollo(Signout);

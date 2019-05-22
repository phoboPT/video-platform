import gql from 'graphql-tag';
import Link from 'next/link';
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
    onCompleted={() => {
      sessionStorage.clear(); // or localStorage
      client.resetStore().then(() => {
        client.resetStore();
      });
    }}
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[
      { query: CURRENT_USER_QUERY },
      {
        query: ALL_COURSES_NOUSER,
        variables: { published: 'PUBLISHED', skip: 0, first: 5 },
      },
    ]}
  >
    {signout => (
      <Link href="/">
        <button type="button" onClick={signout} tag="a">
          Sign Out
        </button>
      </Link>
    )}
  </Mutation>
);

export default withApollo(Signout);

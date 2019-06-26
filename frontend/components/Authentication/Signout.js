import gql from 'graphql-tag';
import Router from 'next/router';
import { Mutation, withApollo } from 'react-apollo';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const logout = async mutation => {
  Router.push({
    pathname: '/index',
    query: { logout: true },
  });

  setTimeout(() => {
    mutation();
  }, 500);
};

const Signout = ({ client }) => (
  <Mutation
    onCompleted={async data => {
      if (data) {
        client.cache.reset();
        await client.reFetchObservableQueries();
      }
    }}
    mutation={SIGN_OUT_MUTATION}
  >
    {signout => (
      <button
        type="button"
        onClick={() => logout(signout)}
        tag="a"
        name="sign out button"
      >
        Sign Out
      </button>
    )}
  </Mutation>
);

export default withApollo(Signout);

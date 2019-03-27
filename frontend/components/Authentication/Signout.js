import gql from "graphql-tag";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <Link href="/">
        <button onClick={signout} tag="a">
          Sign Out
        </button>
      </Link>
    )}
  </Mutation>
);

export default Signout;

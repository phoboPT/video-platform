import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Static/ErrorMessage';
import Form from '../styles/Form';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  state = {
    confirmPassword: '',
    password: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken } = this.props;
    return (
      <Mutation
        mutation={RESET_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
      >
        {(reset, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ password: '', confirmPassword: '' });
            }}
          >
            <fieldset aria-busy={loading} disabled={loading}>
              <h2>Reset your password</h2>
              <Error error={error} />

              <label htmlFor="password">
                Password
                <input
                  name="password"
                  onChange={this.saveToState}
                  placeholder="password"
                  type="password"
                  value={password}
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirm Your Password
                <input
                  name="confirmPassword"
                  onChange={this.saveToState}
                  placeholder="confirmPassword"
                  type="password"
                  value={confirmPassword}
                />
              </label>
              <button type="submit" name="submit the new password">
                Confirm
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;

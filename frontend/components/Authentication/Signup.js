import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Static/ErrorMessage';
import Form from '../styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, name, password } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={this.state}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ name: '', email: '', password: '' });
              Router.push({
                pathname: '/choose-interests',
              });
            }}
          >
            <fieldset aria-busy={loading} disabled={loading}>
              <h2>Sign Up for An Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  onChange={this.saveToState}
                  placeholder="email"
                  required
                  type="email"
                  value={email}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  name="name"
                  onChange={this.saveToState}
                  placeholder="name"
                  required
                  type="text"
                  value={name}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  name="password"
                  onChange={this.saveToState}
                  placeholder="password"
                  required
                  type="password"
                  value={password}
                />
              </label>
              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };

import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
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
const Style = styled.div`
  width: 50%;
  margin: auto;
  #container {
    width: 90%;
    margin: auto auto auto auto;
    input {
      width: 350px;
      height: 30px;
      border-radius: 2px;
      border: none;
      text-align: center;
      -moz-box-shadow: 2px 2px 3px 3px #ccc;
      -webkit-box-shadow: 2px 2px 3px 3px #ccc;
      box-shadow: 2px 2px 3px 3px #ccc;
    }
    #divInput {
      width: 50%;
      margin: auto auto auto 10rem;
    }
    #divInput2 {
      width: 50%;
      margin: auto auto 3rem 10rem;
    }
    h2 {
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 2px solid lightgray;
    }
  }
  #button {
    text-align: right;
    button {
      width: 150px;
      height: 30px;
      border-radius: 10px;
      border: none;
      background: #ffbe56;
      color: white;
      cursor: pointer;
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
          <Style>
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ password: '', confirmPassword: '' });
              }}
            >
              <fieldset aria-busy={loading} disabled={loading}>
                <div id="container">
                  <h2>Reset your password</h2>
                  <Error error={error} />

                  <label htmlFor="password">
                    <div id="divInput">
                      <p>Password</p>
                      <input
                        name="password"
                        onChange={this.saveToState}
                        placeholder="Password"
                        type="password"
                        value={password}
                      />
                    </div>
                  </label>
                  <label htmlFor="confirmPassword">
                    <div id="divInput2">
                      <p>Confirm Your Password</p>
                      <input
                        id="2"
                        name="confirmPassword"
                        onChange={this.saveToState}
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                      />
                    </div>
                  </label>
                </div>
                <div id="button">
                  <button type="submit" name="submit the new password">
                    Confirm
                  </button>
                </div>
              </fieldset>
            </form>
          </Style>
        )}
      </Mutation>
    );
  }
}

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;

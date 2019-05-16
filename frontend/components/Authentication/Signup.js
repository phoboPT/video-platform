import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Error from '../Static/ErrorMessage';
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

const Style = styled.div`
  display: grid;
  text-align: center;

  input,
  input[placeholder] {
    text-align: center;
    font-size: 17px;
  }
  #fieldset {
    margin: auto;
    border: none;
    width: 80%;
    display: grid;

    input {
      padding-left: 15px;
      border-radius: 7px;
      height: 40px;
      width: 300px;
    }
    #h2 {
      color: #adadad;
      font-size: 26px;
      text-align: center;
    }
    #img {
      margin: auto;
      width: 25%;
    }
    #email {
      background: url('../../static/email-icon.png') no-repeat left;
      margin: auto auto 1rem auto;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }
    #name {
      background: url('../../static/icon-user.png') no-repeat left center;

      margin: auto auto 1rem auto;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }
    #password {
      background: url('../../static/password-icon.gif') no-repeat left;
      margin: auto;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }
    #register {
      margin: 1rem auto;
      height: 35px;
      width: 250px;
      font-size: 18px;
      color: white;
      background: #556080;
      border-radius: 6px;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }
    #img {
      margin: auto;
      width: 25%;
    }
  }
`;

const ButtonStyle = styled.div`
  padding-bottom: 1rem;
  button {
    background: none;
    border: none;
    font-size: 15px;
    line-height: 10px;
    color: #2c2f33;
    cursor: pointer;
  }
  button:focus {
    outline: none;
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
    const { changeView } = this.props;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={this.state}
      >
        {(signup, { error, loading }) => (
          <>
            <ButtonStyle>
              <button id="back" onClick={() => changeView(1)} type="button">
                ⬅ Go Back
              </button>
            </ButtonStyle>
            <Style>
              <form
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
                <fieldset id="fieldset" aria-busy={loading} disabled={loading}>
                  <img id="img" alt="user" src="../../static/register.png" />
                  <h2 id="h2">Sign Up for An Account</h2>
                  <Error error={error} />
                  <p>Email</p>
                  <input
                    id="email"
                    name="email"
                    onChange={this.saveToState}
                    placeholder="email"
                    required
                    type="email"
                    value={email}
                  />
                  <p>Name</p>
                  <input
                    id="name"
                    name="name"
                    onChange={this.saveToState}
                    placeholder="name"
                    required
                    type="text"
                    value={name}
                  />
                  <p>Password</p>
                  <input
                    id="password"
                    name="password"
                    onChange={this.saveToState}
                    placeholder="password"
                    required
                    type="password"
                    value={password}
                  />
                  <button id="register" type="submit">
                    Register
                  </button>
                </fieldset>
              </form>
            </Style>
          </>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };

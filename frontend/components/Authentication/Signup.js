import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Error from '../Static/ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import { TOGGLE_LOGIN_MUTATION } from './LoginPage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $thumbnail: String!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      thumbnail: $thumbnail
    ) {
      id
      email
      name
    }
  }
`;

const Style = styled.div`
  display: grid;
  text-align: center;
  background: white;
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

    #h2 {
      color: #adadad;
      font-size: 26px;
      text-align: center;
    }
    #img {
      margin: auto;
      width: 25%;
    }

    #div-email {
      display: flex;
      #container {
        display: flex;
        margin: auto;

        #email {
          float: left;
          order: 2;
          border: 0.5px solid rgba(225, 220, 220, 1);
        }
      }
    }

    #div-name {
      display: flex;
      #container {
        display: flex;
        margin: 1.5rem auto;

        #name {
          order: 2;
          margin: auto;
          border: 0.5px solid rgba(225, 220, 220, 1);
        }
      }
    }
    #div-password {
      display: flex;
      #container {
        display: flex;
        margin: auto;

        #password {
          order: 2;
          border: 0.5px solid rgba(225, 220, 220, 1);
        }
      }
    }

    #register {
      margin: 4rem auto;
      height: 45px;
      width: 300px;
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
  margin-top: 2rem;
  margin-left: 1rem;
  button {
    background: none;
    border: none;
    font-size: 30px;
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
    thumbnail: '../../static/userDefault.webp',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = async (e, mutation, toggleLogin) => {
    e.preventDefault();
    const { password } = this.state;
    if (password.length < 8) {
      this.setState({
        error: { message: 'Your password should have more than 8 characteres' },
      });
    } else {
      await mutation();
      await toggleLogin();
      this.setState({ name: '', email: '', password: '' });
      Router.push({
        pathname: '/choose-interests',
      });
    }
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
          <Mutation mutation={TOGGLE_LOGIN_MUTATION}>
            {toggleLogin => (
              <>
                <ButtonStyle>
                  <button
                    id="back"
                    onClick={() => changeView(1)}
                    type="button"
                    name="go back"
                  >
                    ↶
                  </button>
                </ButtonStyle>
                <Style>
                  <form
                    method="post"
                    onSubmit={async e => {
                      this.submitForm(e, signup, toggleLogin);
                    }}
                  >
                    <fieldset
                      id="fieldset"
                      aria-busy={loading}
                      disabled={loading}
                    >
                      <img
                        id="img"
                        alt="user"
                        src="../../static/register.webp"
                      />
                      <h2 id="h2">Sign Up for An Account</h2>
                      <Error error={error} />
                      <Error error={this.state.error} />

                      <div id="div-email">
                        <div id="container">
                          <span id="span-email" />
                          <input
                            id="email"
                            name="email"
                            onChange={this.saveToState}
                            placeholder="Email"
                            required
                            type="email"
                            value={email}
                          />
                        </div>
                      </div>

                      <div id="div-name">
                        <div id="container">
                          <span id="span-name" />
                          <input
                            id="name"
                            name="name"
                            onChange={this.saveToState}
                            placeholder="Name"
                            required
                            type="text"
                            value={name}
                          />
                        </div>
                      </div>
                      <div id="div-password">
                        <div id="container">
                          <span id="span-password" />
                          <input
                            id="password"
                            name="password"
                            onChange={this.saveToState}
                            placeholder="Password"
                            required
                            type="password"
                            value={password}
                          />
                        </div>
                      </div>
                      <button
                        id="register"
                        type="submit"
                        name="submit the form"
                      >
                        Register
                      </button>
                    </fieldset>
                  </form>
                </Style>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };

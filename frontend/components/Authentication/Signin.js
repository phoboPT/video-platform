import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { ALL_VIDEOS_USER } from '../InstructorArea/MyVideos/Videos';
import { CURRENT_USER_QUERY } from './User';
import { CURRENT_COURSES_QUERY } from '../InstructorArea/MyCourses';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
} from '../Home/CoursesList/ListAllCourses';
import Error from '../Static/ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

const Style = styled.div`
  display: grid;
  form {
    background-image: linear-gradient(
      rgba(225, 239, 247, 0.7),
      rgb(249, 253, 255)
    );
    border: 0.5px solid rgb(249, 253, 255);
    border-radius: 25px;
  }
  #fieldset {
    margin: auto;
    border: none;
    width: 80%;

    display: grid;
    #email {
      margin: auto auto 1rem auto;
    }
    #h2 {
      color: #c4c4c4;
      font-size: 26px;
      text-align: center;
    }
    #password {
      margin: auto;
    }
    #login {
      margin: 1rem auto;
    }
    #forgot {
      text-align: right;
    }
  }
  #register {
    margin: 3rem;
    width: 70%;
    #register-button {
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    first: 5,
    password: '',
    published: 'PUBLISHED',
    skip: 0,
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    const { changeView } = this.props;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
          { query: CURRENT_COURSES_QUERY },
          {
            query: ALL_VIDEOS_USER,
          },
          {
            query: ALL_COURSE_INTERESTS,
          },
          {
            query: ALL_COURSES_ORDERED,
            variables: { published: 'PUBLISHED', skip: 0, first: 5 },
          },
          {
            query: ALL_COURSES_QUERY,
          },
        ]}
        variables={this.state}
      >
        {(signin, { error, loading }) => (
          <Style>
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signin();
                this.setState({ email: '', password: '' });
                Router.push({
                  pathname: '/',
                });
              }}
            >
              <fieldset id="fieldset" aria-busy={loading} disabled={loading}>
                <h2 id="h2">Sign In</h2>
                <Error error={error} />

                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.saveToState}
                  required
                  type="email"
                  value={email}
                />

                <input
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.saveToState}
                  required
                  type="password"
                  value={password}
                />

                <button id="login" type="submit">
                  Login
                </button>

                <div id="forgot">
                  <button type="button" onClick={() => changeView(2)}>
                    Forgot Password?
                  </button>
                </div>
              </fieldset>
            </form>

            <div id="register">
              <button
                id="register-button"
                type="button"
                onClick={() => changeView(3)}
              >
                You are not yet registered? Register now!
              </button>
            </div>
          </Style>
        )}
      </Mutation>
    );
  }
}

export default Signin;
export { SIGNIN_MUTATION };

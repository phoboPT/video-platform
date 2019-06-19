import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ALL_VIDEOS_USER } from '../InstructorArea/UploadVideo/CreateVideo';
import { CURRENT_USER_QUERY } from './User';
import { CURRENT_COURSES_QUERY } from '../InstructorArea/MyCourses';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../Home/CoursesList/ListAllCourses';
import { PAGINATION_QUERY } from '../Home/CoursesList/PaginationCourse';
import { COURSES_FILTER_QUERY } from '../Courses/UserCourses';
import Error from '../Static/ErrorMessage';
import { TOGGLE_LOGIN_MUTATION } from './LoginPage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
      thumbnail
      permission
      password
    }
  }
`;

const Style = styled.div`
  margin-top: 1rem;

  display: grid;
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
        margin: 2rem auto;

        #email {
          float: left;
          order: 2;
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
          margin: auto;
          border: 0.5px solid rgba(225, 220, 220, 1);
        }
      }
    }

    #login {
      margin: 1rem auto;
      height: 35px;
      width: 250px;
      font-size: 18px;
      color: white;
      background: #556080;
      border-radius: 6px;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }

    #forgot {
      #forgot-button {
        color: #9787ff;
        cursor: pointer;
        background: none;
        border: none;
        &:hover {
          color: #2c2363;
        }
      }
      color: white;
      text-align: right;
    }
  }
  #register {
    width: 95%;
    margin: 4rem auto;
    border-top: 1px solid #d7e4ed;
    text-align: center;
    #register-button {
      outline: none;
      margin: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #9787ff;
      &:hover {
        color: #2c2363;
      }
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

  submitForm = async (e, mutation, toggleLogin) => {
    e.preventDefault();
    const res = await mutation();
    await toggleLogin();
    this.setState({ email: '', password: '' });

    if (res.data.signin.permission[0] === 'ADMIN') {
      localStorage.setItem('isAdminPage', true);
      Router.push({
        pathname: '/administrator',
      });
    } else {
      localStorage.setItem('isAdminPage', false);
      Router.push({
        pathname: '/index',
      });
    }
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
          {
            query: COURSES_FILTER_QUERY,
            variables: { author: 'a', category: 'a' },
          },
          {
            query: CURRENT_COURSES_QUERY,
          },
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
          {
            query: ALL_COURSES_RATING,
          },
          {
            query: PAGINATION_QUERY,
          },
        ]}
        variables={this.state}
      >
        {(signin, { error, loading }) => (
          <Mutation mutation={TOGGLE_LOGIN_MUTATION}>
            {toggleLogin => (
              <Style open>
                <form
                  method="post"
                  onSubmit={e => this.submitForm(e, signin, toggleLogin)}
                >
                  <fieldset
                    id="fieldset"
                    aria-busy={loading}
                    disabled={loading}
                  >
                    <img id="img" alt="user" src="../../static/user.webp" />
                    <h2 id="h2">Sign In</h2>
                    <Error error={error} />

                    <div id="div-email">
                      <div id="container">
                        <span id="span-email" />
                        <input
                          id="email"
                          name="email"
                          placeholder="Email"
                          onChange={this.saveToState}
                          required
                          type="email"
                          value={email}
                        />
                      </div>
                    </div>
                    <div id="div-password">
                      <div id="container">
                        <span id="span-password" />
                        <input
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={this.saveToState}
                          required
                          type="password"
                          value={password}
                        />
                      </div>
                    </div>
                    <button
                      id="login"
                      type="submit"
                      name="login to your account"
                    >
                      Login
                    </button>
                    <div id="forgot">
                      <button
                        id="forgot-button"
                        type="button"
                        onClick={() => changeView(2)}
                        name="forgot your password"
                      >
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
                    name="register a new account"
                  >
                    You are not yet registered? REGISTER HERE!
                  </button>
                </div>
              </Style>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

Signin.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default withApollo(Signin);
export { SIGNIN_MUTATION };

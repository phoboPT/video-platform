import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../Static/ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import { CURRENT_COURSES_QUERY } from "../Courses/MyCourses/MyCourses";
import { ALL_VIDEOS_USER } from "..//Courses/MyVideos/Videos";
import { Route, Redirect } from "react-router";
import Link from "next/link";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeRedirect = e => {
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect === true) {
      <Link to="/">
        <a>hi</a>
      </Link>;
    }

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
          { query: CURRENT_COURSES_QUERY },
          {
            query: ALL_VIDEOS_USER,
          },
        ]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({ name: "", email: "", password: "" });
              this.changeRedirect();
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
export { SIGNUP_MUTATION };

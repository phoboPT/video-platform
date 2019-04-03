import gql from "graphql-tag";
import Router from "next/router";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ALL_VIDEOS_USER } from "..//Courses/MyVideos/Videos";
import { CURRENT_USER_QUERY } from "../Authentication/User";
import { CURRENT_COURSES_QUERY } from "../Courses/MyCourses/MyCourses";
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY
} from "../Home/CoursesList/ListAllCourses";
import Error from "../Static/ErrorMessage";
import Form from "../styles/Form";

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
    first: 5,
    password: "",
    published: "PUBLISHED",
    skip: 0
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          },
          { query: CURRENT_COURSES_QUERY },
          {
            query: ALL_VIDEOS_USER
          },
          {
            query: ALL_COURSE_INTERESTS
          },
          {
            query: ALL_COURSES_ORDERED,
            variables: { published: "PUBLISHED", skip: 0, first: 5 }
          },
          {
            query: ALL_COURSES_QUERY
          }
        ]}
        variables={this.state}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({ name: "", email: "", password: "" });
              Router.push({
                pathname: "/"
              });
            }}
          >
            <fieldset aria-busy={loading} disabled={loading}>
              <h2>Sign In</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  onChange={this.saveToState}
                  placeholder="email"
                  required
                  type="email"
                  value={this.state.email}
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
                  value={this.state.password}
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

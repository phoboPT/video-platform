import React, { Component } from 'react';
import Form from './styles/Form';

export default class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          // await signup();
          this.setState({ name: '', email: '', password: '' });
        }}
      >
        <fieldset disabled="" aria-busy="">
          <h2>Sign In</h2>

          <label htmlFor="email">
            Email
            <input
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
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.saveToState}
            />
          </label>

          <button type="submit">Sign Up!</button>
        </fieldset>
      </Form>
    );
  }
}

import React, { Component } from "react";
import styled from "styled-components";

class FormCourse extends Component {
  state = {
    email: "",
    password: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <fieldset disabled="false" aria-busy="false">
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

          <button type="submit">Sign In!</button>
        </fieldset>
      </div>
    );
  }
}

export default FormCourse;

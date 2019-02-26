import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";

const Container = styled.div`
  max-width: 70%;
  margin: auto;
  label {
    text-align: left;
  }
`;

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
      <Container>
        <Form>
          <fieldset disabled={false} aria-busy={false}>
            <h2>Info</h2>
            <label htmlFor="email">
              Title
              <input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
            </label>
            <label htmlFor="password">
              Description
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </label>
            <label htmlFor="password">
              State
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </label>
            <label htmlFor="password">
              Target
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </label>
            <label htmlFor="password">
              Thumbnail
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </label>

            {this.props.children}
          </fieldset>
        </Form>
      </Container>
    );
  }
}

export default FormCourse;

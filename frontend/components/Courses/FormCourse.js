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
  state = this.props.state;

  saveToState(e) {
    this.props.saveToState(this.state.title, e);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Container>
        <Form>
          <fieldset disabled={false} aria-busy={false}>
            <h2>Information</h2>
            <label htmlFor="Title">
              Title
              <input
                type="text"
                name="title"
                placeholder="title"
                value={this.state.title}
                onChange={this.saveToState.bind(this)}
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                name="description"
                placeholder="description"
                value={this.state.description}
                onChange={this.saveToState.bind(this)}
              />
            </label>
            <label htmlFor="state">
              State
              <input
                type="text"
                name="state"
                placeholder="state"
                value={this.state.state}
                onChange={this.saveToState.bind(this)}
              />
            </label>
            <label htmlFor="target">
              Target
              <input
                type="text"
                name="target"
                placeholder="target"
                value={this.state.target}
                onChange={this.saveToState.bind(this)}
              />
            </label>
            <label htmlFor="thumbnail">
              Thumbnail
              <input
                type="text"
                name="thumbnail"
                placeholder="thumbnail"
                value={this.state.thumbnail}
                onChange={this.saveToState.bind(this)}
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

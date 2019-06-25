import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: auto;

  p {
    text-align: left;
    margin: 2rem 0 5px 0;
  }
  #top-text {
    color: #7c7c7c;
    font-size: 13px;
    margin-bottom: 2rem;
    margin-top: 0;
    padding-bottom: 8px;
    border-bottom: 2px solid lightgray;
  }
  textarea {
    resize: none;
    margin-top: 1rem;
  }
`;

class InstructorForm extends Component {
  render() {
    const { message, handleChange } = this.props;
    return (
      <Container>
        <form>
          <br />
          <p id="top-text">
            Hi , write why you should be Instructor , and the benefits that you
            can bring to the platform
          </p>

          <p>Message</p>
          <textarea
            rows="30"
            cols="50"
            id="name"
            type="text"
            name="message"
            defaultValue={message}
            onChange={handleChange}
          />
        </form>
      </Container>
    );
  }
}

export default InstructorForm;

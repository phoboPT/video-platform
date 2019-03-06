import React, { Component } from "react";
import styled from "styled-components";

const Style = styled.div`
  textarea {
    resize: none;
    overflow: auto;
    margin: 2rem;
    float: right;
    width: calc(100% - 35px);
    height: auto;
  }
  button {
    text-align: right;
  }
`;

export class CommentForm extends Component {
  render() {
    return (
      <Style>
        <form>
          <textarea placeholder="Write your comment" required rows="6" />
          <button>Comment</button>
        </form>
      </Style>
    );
  }
}

export default CommentForm;

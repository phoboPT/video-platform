import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-right: 5px;
  &:disabled {
    background: #3a8925 !important;
    opacity: 0.5;
    color: white !important;
  }
`;
export class Published extends Component {
  render() {
    return (
      <Button
        type="button"
        onClick={() => this.props.changePublished()}
        disabled={this.props.published}
      >
        <img src="../../../../static/rightpublished.png" /> Published
      </Button>
    );
  }
}

export default Published;

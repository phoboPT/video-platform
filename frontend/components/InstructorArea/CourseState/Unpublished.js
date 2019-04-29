import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  :disabled {
    background: #ff0000 !important;
    opacity: 0.5;
    color: white !important;
  }
`;
class Unpublished extends Component {
  render() {
    return (
      <Button
        type="button"
        disabled={this.props.unpublished}
        onClick={() => this.props.changeUnpublished()}
      >
        <img src="../../../static/forbidden.png" /> Unpublished
      </Button>
    );
  }
}
export default Unpublished;

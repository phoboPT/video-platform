import React, { Component } from "react";
import styled from "styled-components";

const Style = styled.div``;
export class Unpublished extends Component {
  render() {
    return (
      <Style>
        <button
          type="button"
          disabled={this.props.unpublished}
          onClick={() => this.props.changeUnpublished()}
        >
          <img src="../../../../static/forbidden.png" /> Unpublished
        </button>
      </Style>
    );
  }
}
export default Unpublished;

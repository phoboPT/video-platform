import React, { Component } from "react";

export class Published extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={() => this.props.changePublished()}
        disabled={this.props.published}
      >
        <img src="../../../../static/rightpublished.png" /> Published
      </button>
    );
  }
}

export default Published;

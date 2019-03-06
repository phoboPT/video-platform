import React, { Component } from "react";
import Markdown from "react-markdown";

class Overview extends Component {
  state = this.props;
  render() {
    return (
      <div>
        <p>Author: {this.state.data.user.name}</p>
        <br />

        <p>Title: {this.state.data.title}</p>
        <Markdown escapeHtml={false} source={this.state.data.description} />
      </div>
    );
  }
}

export default Overview;

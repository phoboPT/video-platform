import React, { Component } from "react";
import Markdown from "react-markdown";

class Overview extends Component {
  render() {
    return (
      <div>
        <p>Author: {this.props.data.user.name}</p>
        <br />

        <p>Title: {this.props.data.title}</p>
        <Markdown escapeHtml={false} source={this.props.data.description} />
      </div>
    );
  }
}

export default Overview;

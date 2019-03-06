import React, { Component } from "react";

class Overview extends Component {
  state = this.props;
  render() {
    return (
      <div>
        <p>Author: {this.state.data.user.name}</p>
        <br />

        <p>Title: {this.state.data.title}</p>
        <p>Description: {this.state.data.description}</p>
      </div>
    );
  }
}

export default Overview;

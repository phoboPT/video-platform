import React, { Component } from "react";
import Videos from "../components/Videos/Videos";
class videos extends Component {
  render() {
    return (
      <div>
        <Videos page={parseFloat(props.query.page) || 1} />
      </div>
    );
  }
}

export default videos;

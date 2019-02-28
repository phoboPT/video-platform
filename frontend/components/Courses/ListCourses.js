import React, { Component } from "react";
import Video from "./Video";
import PropTypes from "prop-types";
class ListCourses extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const { data } = this.props;
    console.log("data", data);
    return <>{data && data.map(video => <p>{video.id}</p>)}</>;
  }
}

export default ListCourses;

import { timingSafeEqual } from "crypto";
import React, { Component } from "react";

class Editor extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.ReactQuill = require("react-quill");
    }
  }

  changeState = e => {
    this.props.changeQuill(e);
  };

  render() {
    const ReactQuill = this.ReactQuill;
    console.log("data", this.props.data);
    if (typeof window !== "undefined" && ReactQuill) {
      return <ReactQuill onChange={this.changeState} value={this.props.data} />;
    } else {
      return <textarea />;
    }
  }
}
export default Editor;

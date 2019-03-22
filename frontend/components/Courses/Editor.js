import React, { Component } from "react";

class Editor extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.ReactQuill = require("react-quill");
    }
  }

  render() {
    const ReactQuill = this.ReactQuill;
    if (typeof window !== "undefined" && ReactQuill) {
      return (
        <ReactQuill onChange={this.props.onChange} value={this.props.value} />
      );
    } else {
      return <textarea />;
    }
  }
}
export default Editor;

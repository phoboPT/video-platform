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
    console.log(this.props.data);
    if (typeof window !== "undefined" && ReactQuill) {
      return (
        <ReactQuill
          modules={this.modules}
          onChange={this.props.changeQuill()}
          value={this.props.data}
        />
      );
    } else {
      return <textarea />;
    }
  }
}
export default Editor;

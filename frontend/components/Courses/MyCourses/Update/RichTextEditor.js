const ReactQuill = require("react-quill"); // ES6

import React, { Component } from "react";

export class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.defaultValue }; // You can also pass a Quill Delta here

    if (typeof window !== "undefined") {
      this.ReactQuill = require("react-quill");
    }
  }
  changeQuill = value => {
    this.setState({ text: value, description: value });
  };
  render() {
    const ReactQuill = this.ReactQuill;
    if (document) {
      return (
        <ReactQuill onChange={this.props.changeQuill} value={this.state.text} />
      );
    } else {
      return <textarea />;
    }
  }
}

export default RichTextEditor;

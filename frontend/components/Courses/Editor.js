import React, { Component } from "react";

class Editor extends Component {
  state = { text: "" };

  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.ReactQuill = require("react-quill");
    }
  }

  changeState = e => {
    this.setState({ text: e });
    this.props.changeQuill(e);
  };

  componentWillMount = () => {
    this.setState({ text: this.props.data });
  };

  render() {
    const ReactQuill = this.ReactQuill;

    if (typeof window !== "undefined" && ReactQuill) {
      return <ReactQuill onChange={this.changeState} value={this.state.text} />;
    } else {
      return <textarea />;
    }
  }
}
export default Editor;

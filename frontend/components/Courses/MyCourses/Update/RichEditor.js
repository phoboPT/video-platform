import React, { Component, PropTypes } from "react";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";

export default class RichTextField extends Component {
  constructor(props) {
    super(props);
    console.log(props.content);

    let editorState;

    if (props.content) {
      const blocksFromHTML = convertFromHTML(props.content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
  }

  handleChange = editorState => {
    const content = convertToHTML(editorState.getCurrentContent());
    console.log(content);
  };

  render() {
    return (
      <Editor
        defaultEditorState={this.state.editorState}
        onEditorStateChange={this.handleChange}
      />
    );
  }
}

import PropTypes from "prop-types";
import React, { Component } from "react";

class Section extends Component {
  drag = e => {
    e.dataTransfer.setData("transfer", e.target.id);
  };

  noAllowDrop = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        draggable={true}
        id={this.props.id}
        onDragOver={this.noAllowDrop}
        onDragStart={this.drag}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  style: PropTypes.object,
};
export default Section;

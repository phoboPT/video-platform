import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

export class Container extends Component {
  drop = e => {
    e.preventDefault;
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  };

  allowDrop = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div
        id={this.props.id}
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
Container.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  style: PropTypes.object,
};
export default Container;

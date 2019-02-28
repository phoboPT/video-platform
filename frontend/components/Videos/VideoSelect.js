import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.div`
  margin: 0 3rem;
  width: 95%;
  overflow: hidden;
  border-bottom: 1px solid black;
  img {
    width: 200px;
    height: 120px;
  }

  span {
    vertical-align: top;
  }

  .item1 {
    grid-area: menu;
    width: 200px;
    height: 120px;
  }
  .item2 {
    grid-area: main;
  }
  .item3 {
    grid-area: button;
    margin: auto;
  }
  .grid-container {
    display: grid;
    grid-template-areas: "menu main main main main main main button ";
    grid-gap: 2px;
  }

  .grid-container > div {
    background-color: ${props => props.theme.white};
    text-align: left;
    padding: 20px 0;
  }
  p {
    font-size: 1.5rem;
    margin: 5px;
    text-align: left;
  }
`;

class VideoSelect extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired
  };
  render() {
    const { video } = this.props;
    return (
      <List>
        <div className="grid-container">
          <div className="item1">
            <>
              <img
                src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg"
                height="42"
                width="42"
              />
            </>
          </div>
          <div className="item2">
            <p>
              Title: <span>{video.title}</span>
            </p>
            <p>
              Description: <span>{video.description}</span>
            </p>
            <p>
              Category: <span>{video.category.name}</span>
            </p>
          </div>
          <div className="item3">{this.props.children}</div>
        </div>
      </List>
    );
  }
}

export default VideoSelect;

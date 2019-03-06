import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const Item = styled.div`
  max-width: 500px;
  border: 1px solid black;
  text-align: center;
  img {
    height: 45px !important;
    width: 45px;
  }
  .main {
    width: 50%;
    float: left;
  }
  .info {
    width: 50%;
    float: right;
  }
  span {
    padding-left: 15px;
  }
`;

export class Video extends Component {
  static propTypes = { videos: PropTypes.object.isRequired };

  render() {
    const { videos } = this.props;
    console.log(videos);
    return (
      <Item>
        <div className="main">
          <Link
            href={{
              pathname: "/video",
              query: { id: videos.video.id }
            }}
          >
            <a>
              <img src="../static/play-button.png" />
            </a>
          </Link>
          <span>{videos.video.title}</span>
        </div>
        <div className="info">
          <p>{videos.video.description}</p>
        </div>
      </Item>
    );
  }
}

export default Video;

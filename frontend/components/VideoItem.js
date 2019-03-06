import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const Item = styled.div`
  display: inline;
  img {
    height: 45px;
  }
`;

export class Video extends Component {
  static propTypes = { videos: PropTypes.object.isRequired };

  render() {
    const { videos } = this.props;
    return (
      <Item>
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
        <p>{videos.video.title}</p>
        <p>{videos.price}</p>
      </Item>
    );
  }
}

export default Video;

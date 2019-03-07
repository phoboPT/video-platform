import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.div`
  max-width: 1400px;

  .image {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 5%;
    border-bottom: 1px solid lightgray;
  }
  .title {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 20%;
    border-bottom: 1px solid lightgray;
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 70%;
    border-bottom: 1px solid lightgray;
  }
  .end {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 5%;
    border-bottom: 1px solid lightgray;
    button {
    }
  }
  img {
    height: 30px;
    width: 30px;
  }

  span {
    padding-left: 15px;
  }
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`;

export class Video extends Component {
  static propTypes = {
    videos: PropTypes.object.isRequired,
    data: PropTypes.string.isRequired
  };

  render() {
    const { videos, data } = this.props;

    return (
      <List>
        <div className="image">
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
        </div>

        <div className="title">
          <span>
            {data + 1} {videos.video.title}
          </span>
        </div>
        <div className="description">
          <span>{videos.video.description}</span>
        </div>
        <div className="end">{this.props.children}</div>
      </List>
    );
  }
}

export default Video;

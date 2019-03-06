import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.div`
  max-width: 1400px;
  margin: 40px auto 0 auto;

  .image {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 5%;
    border-bottom: 1px solid lightgray;
  }
  .call-out {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 50%;
    border-bottom: 1px solid lightgray;
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

    console.log(videos);
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

        <div className="call-out">
          <span>
            {data + 1} {videos.video.title}
          </span>
        </div>
        <div className="call-out">
          <span>{videos.video.description}</span>
        </div>
      </List>
    );
  }
}

export default Video;

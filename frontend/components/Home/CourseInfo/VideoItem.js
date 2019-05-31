import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.div`
  .image {
    padding: auto;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 5%;
    border-bottom: 1px solid lightgray;
  }
  .title {
    padding: auto;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 20%;
    border-bottom: 1px solid lightgray;
  }
  .description {
    padding: auto;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 65%;
    border-bottom: 1px solid lightgray;
  }
  .end {
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 10%;
    border-bottom: 1px solid lightgray;
    text-align: right;
    a {
      padding-right: 20px;
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
    data: PropTypes.number.isRequired,
  };

  render() {
    const { videos, data, courseId } = this.props;
    return (
      <List>
        <div className="image">
          <Link
            href={{
              pathname: '/video',
              query: { id: courseId },
            }}
          >
            <a>
              <img src="../static/play-button.webp" />
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
        <div className="end">
          {videos.video.file && (
            <Link href={videos.video.file}>
              <a>
                <img className="file" src="../../../static/fileIcon.webp" />
              </a>
            </Link>
          )}

          {this.props.children}
        </div>
      </List>
    );
  }
}

export default Video;

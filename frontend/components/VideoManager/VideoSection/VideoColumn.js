/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import Link from 'next/link';

const Container = styled.div`
  margin: 1.5rem;
  border-radius: 2px;
  div {
    display: flex;
    background-color: #1f8fc2;
    margin-block-end: 1.5rem;
  }

  input {
    margin: auto auto auto 5px;
  }
  .right {
    margin: 1rem;
    text-align: left;
    width: 100%;
  }

  button {
    display: flex !important;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    width: 100%;
    span {
      flex: 1;
      order: 3;
      margin: auto;
    }
    p {
      padding-left: 6px;
      text-align: left;
      flex: 6;
      order: 1;
    }
    a {
      margin: auto;
      text-align: left;
      flex: 1;
      order: 2;
      img {
        height: 30px;
        width: 30px;
      }
    }
  }
  .selected {
  }
`;

class InnerList extends React.PureComponent {
  state = { selected: false };

  static propTypes = {
    item: PropTypes.string.isRequired,
    changeSelectedVideo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    videosWatched: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const { videosWatched, item } = this.props;
    try {
      videosWatched[0].videoItem.map(video => {
        if (video.video.id === item) {
          if (video.watched) {
            return this.setState({ selected: true });
          }
        }
        return null;
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { item, changeSelectedVideo, data } = this.props;
    const { selected } = this.state;
    return (
      <div className="right">
        <input type="checkbox" defaultChecked={selected} disabled />
        <button type="button" onClick={() => changeSelectedVideo(item)}>
          {data.course.videos.map(video => {
            if (video.video.id === item) {
              return (
                <Fragment key={item}>
                  <p>{video.video.title}</p>
                  <span>{video.video.duration}</span>
                  {video.video.file && (
                    <Link href={video.video.file}>
                      <a>
                        <img src="../../static/fileIcon.png" alt="file" />
                      </a>
                    </Link>
                  )}
                </Fragment>
              );
            }
            return null;
          })}
        </button>
      </div>
    );
  }
}

class VideoColumn extends Component {
  state = this.props;

  render() {
    const {
      section,
      videos,
      files,
      changeSelectedVideo,
      id,
      selected,
    } = this.state;
    const { show, data, videosWatched } = this.props;
    return (
      <Container>
        {section.videoIds.map(item => {
          const video = videos[item];
          const file = files[item];
          if (show) {
            return (
              <InnerList
                videosWatched={videosWatched}
                key={item}
                data={data}
                selected={selected}
                changeSelectedVideo={changeSelectedVideo}
                video={video}
                file={file}
                item={item}
                id={id}
              />
            );
          }
          return null;
        })}
      </Container>
    );
  }
}

VideoColumn.propTypes = {
  data: PropTypes.object.isRequired,
  show: PropTypes.bool,
  videosWatched: PropTypes.array.isRequired,
};

export default VideoColumn;
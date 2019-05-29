/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { formatTime } from '../../../lib/sumAll';

const Container = styled.div`
  max-width: 100%;
  margin-bottom: 2rem;
  border: 1.5px solid #d8d8d8;
  border-top: 0;

  input {
    margin: auto auto auto 5px;
  }
  .right {
    text-align: left;
    width: 100%;
    margin: auto;
    display: flex;
    border-bottom: 1.5px solid #ededed;

    &:hover {
      background-color: #edeaea;
    }
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
      text-align: right;
      padding-right: 1rem;
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
  #selected {
    background-color: rgba(4, 38, 9, 0.4);
  }
`;

class InnerList extends React.PureComponent {
  state = { selected: false };

  static propTypes = {
    item: PropTypes.string.isRequired,
    changeSelectedVideo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    videosWatched: PropTypes.array.isRequired,
    controller: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  async componentDidMount() {
    const { videosWatched, item, controller, id, index } = this.props;
    try {
      videosWatched[0].videoItem.forEach(async video => {
        if (video.video.id === item) {
          if (video.watched) {
            await this.setState({ selected: true });
          }
        }
      });
    } catch (e) {
      console.warn(e);
    }
    if (id === controller.section) {
      if (controller.active === index) {
        await this.setState({ active: true });
      }
    }
  }

  changeSelected = (item, selected) => {
    const { changeSelectedVideo, id } = this.props;

    changeSelectedVideo(item, selected, id);
  };

  render() {
    const { item, data, index } = this.props;
    const { selected, active } = this.state;
    return (
      <div className="right" id={active ? 'selected' : ''}>
        <input type="checkbox" checked={selected} disabled />
        <button type="button" onClick={() => this.changeSelected(item, index)}>
          {data.course.videos.map(video => {
            if (video.video.id === item) {
              return (
                <Fragment key={item}>
                  <p>{video.video.title}</p>
                  <span>{formatTime(video.video.duration, 2)}</span>
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
    const { show, data, videosWatched, controller } = this.props;
    return (
      <Container>
        {section.videoIds.map((item, index) => {
          const video = videos[item];
          const file = files[item];
          if (show) {
            return (
              <InnerList
                controller={controller}
                videosWatched={videosWatched}
                key={item}
                data={data}
                selected={selected}
                changeSelectedVideo={changeSelectedVideo}
                video={video}
                file={file}
                item={item}
                id={id}
                index={index}
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
  controller: PropTypes.object.isRequired,
};

export default VideoColumn;

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoColumn from './VideoColumn';
import { sumAllDuration } from '../../../lib/sumAll';

const Container = styled.div`
  margin: 15px 15px;
  max-height: 630px;
  overflow-x: auto;
  border-radius: 4px;
  #container-top {
    background-color: rgba(22, 115, 115, 0.5);
    cursor: pointer;
    height: 80px;
    border: 1.5px solid #d8d8d8;
    border-bottom: 0;
    box-shadow: 0 8px 6px -6px #a8a8a8;
    &:hover {
      box-shadow: 0 0 20px #a8a8a8;
    }

    .left {
      display: flex;
      padding-top: 1rem;
      height: 80px;
      padding-left: 2rem;
      text-align: left;
      margin: auto;
      flex: 9;
      order: 1;
      width: 100%;
      h4 {
        order: 1;
        flex: 9;
      }
      span {
        margin: auto;
        flex: 1;
        order: 2;
      }
    }
    .rigth {
      order: 2;
      flex: 1;
      width: 100%;
      margin: auto;
      text-align: right;
      padding: 1rem 2rem 1rem 0;
    }
  }
  button {
    display: flex;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

class VideoElement extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    section: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    changeSelectedVideo: PropTypes.func.isRequired,
    localStorageId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    videosWatched: PropTypes.array.isRequired,
    controller: PropTypes.object.isRequired,
  };

  state = { selected: this.props.item === this.props.id };

  componentDidMount() {
    const { localStorageId } = this.props;
    const value = JSON.parse(localStorage.getItem(localStorageId));
    this.setState({ show: value });
    this.calculateTotalTime();
  }

  expand = () => {
    const { localStorageId } = this.props;
    const { show } = this.state;
    this.setState({ show: !show });
    localStorage.setItem(localStorageId, !show);
  };

  saveStateToLocalStorage = () => {
    // for every item in React state
    const { localStorageId } = this.props;
    const { show } = this.state;
    localStorage.setItem(localStorageId, show);
  };

  calculateTotalTime = () => {
    const { section, data } = this.props;
    const videoIds = section.videoIds.map(item => item, []);

    const total = [];
    data.course.videos.map(item => {
      videoIds.forEach(id => {
        if (id === item.video.id) total.push(item.video.duration);
      });
    });

    this.setState({ duration: sumAllDuration(total) });
  };

  render() {
    const {
      index,
      section,
      videos,
      files,
      changeSelectedVideo,
      data,
      videosWatched,
      controller,
    } = this.props;
    const { show, duration } = this.state;
    return (
      <Fragment key={index}>
        <div id="container-top">
          <button type="button" onClick={e => this.expand(e, section.id)}>
            <div className="left">
              <h4>{section.title}</h4>

              <span>{duration}</span>
            </div>
            <div className="rigth">🔽</div>
          </button>
        </div>

        <Fragment key={index}>
          <VideoColumn
            controller={controller}
            videosWatched={videosWatched}
            data={data}
            id={section.id}
            section={section}
            key={section.id}
            videos={videos}
            files={files}
            changeSelectedVideo={changeSelectedVideo}
            show={show}
          />
        </Fragment>
      </Fragment>
    );
  }
}

class VideoSection extends Component {
  state = {
    section: JSON.parse(this.props.data.course.section),
  };

  render() {
    if (!this.state.section) return <p>No Content for this course!</p>;
    const {
      data,
      changeSelectedVideo,
      id,
      videosWatched,
      controller,
    } = this.props;
    const { columnOrder, sections, videos, files } = this.state.section;
    return (
      <Container>
        {columnOrder.map(columnId => {
          const section = sections[columnId];
          return (
            <VideoElement
              id={id}
              controller={controller}
              videosWatched={videosWatched}
              section={section}
              key={section.id}
              localStorageId={section.id}
              videos={videos}
              files={files}
              data={data}
              changeSelectedVideo={changeSelectedVideo}
              expand={this.expand}
            />
          );
        })}
      </Container>
    );
  }
}

VideoSection.propTypes = {
  data: PropTypes.object.isRequired,
  changeSelectedVideo: PropTypes.func.isRequired,
  id: PropTypes.string,
  videosWatched: PropTypes.array.isRequired,
  controller: PropTypes.object.isRequired,
};

export default VideoSection;

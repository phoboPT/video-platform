/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoColumn from './VideoColumn';

const Container = styled.div`
  margin: 15px 15px;
  border: 1px solid #d4d8da;
  border-radius: 2px;
  background-color: #d4d8da;
  max-height: 630px;
  overflow-x: auto;

  h4 {
    margin: 1rem;
    background-color: #c2c6c8;
  }
  .left {
    text-align: left;
    flex: 9;
    order: 1;
    background-color: #c2c6c8;
  }
  .rigth {
    order: 2;
    flex: 1;
    width: 100%;
    background-color: #c2c6c8;
    text-align: right;
    padding: 1rem 2rem 1rem 0;
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

class VideoElement extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number,
    section: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,

    files: PropTypes.object.isRequired,
    changeSelectedVideo: PropTypes.func.isRequired,
    localStorageId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    videosWatched: PropTypes.array.isRequired,
  };

  state = { selected: this.props.item === this.props.id };

  componentDidMount() {
    const { localStorageId } = this.props;
    const value = JSON.parse(localStorage.getItem(localStorageId));
    this.setState({ show: value });
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

  render() {
    const {
      index,
      section,
      videos,

      files,
      changeSelectedVideo,
      data,
      videosWatched,
    } = this.props;
    const { show } = this.state;
    return (
      <Fragment key={index}>
        <button type="button" onClick={e => this.expand(e, section.id)}>
          <div className="left">
            <h4>{section.title}</h4>
          </div>
          <div className="rigth">🔽</div>
        </button>

        <Fragment key={index}>
          <VideoColumn
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
    const { data, changeSelectedVideo, id, videosWatched } = this.props;
    const { columnOrder, sections, videos, files } = this.state.section;
    return (
      <Container>
        {columnOrder.map((columnId, index) => {
          const section = sections[columnId];
          return (
            <VideoElement
              id={id}
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
};

export default VideoSection;

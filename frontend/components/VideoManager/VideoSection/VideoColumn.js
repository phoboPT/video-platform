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
    item: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    changeSelectedVideo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { data, item } = this.props;
    data.course.videos.map(video => {
      if (video.video.id === item) {
        if (video.video.watched) {
          this.setState({ selected: true });
        }
      }
    });
  }

  render() {
    const { item, file, changeSelectedVideo, data } = this.props;
    const { selected } = this.state;
    return (
      <div className="right">
        <input
          type="checkbox"
          defaultChecked={selected}
          onChange={this.handleChangeChk}
          disabled
        />
        <button type="button" onClick={() => changeSelectedVideo(item)}>
          {data.course.videos.map(video => {
            if (video.video.id === item) {
              return (
                <>
                  <p>{video.video.title}</p>
                  <span>{video.video.duration}</span>
                  {video.video.file && (
                    <Link href={video.video.file}>
                      <a>
                        <img src="../../static/fileIcon.png" alt="file" />
                      </a>
                    </Link>
                  )}
                </>
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
    const { show, data } = this.props;
    return (
      <Container>
        {section.videoIds.map(item => {
          const video = videos[item];
          const file = files[item];
          // console.log('section', sectionHided, section.id);
          if (show) {
            return (
              <InnerList
                data={data}
                key={item}
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
  show: PropTypes.bool.isRequired,
};

export default VideoColumn;

/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 1rem;
  border-radius: 2px;
  #right {
    display: flex;

    border: 1px solid rgba(204, 204, 204, 0.5);
    margin-block-end: 2px;
    #p {
      order: 1;
      flex: 1;
      padding-left: 8px;
    }
    #img {
      order: 2;
      float: left;
      margin: auto;
      width: 30px;
      height: 30px;
    }
    #span {
      order: 3;
      width: 10%;
    }
  }
`;

class InnerList extends React.PureComponent {
  static propTypes = {
    item: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { item, data } = this.props;
    return (
      <div id="right">
        {data.course.videos.map(video => {
          if (video.video.id === item) {
            return (
              <Fragment key={item}>
                <p id="p">{video.video.title}</p>

                {video.video.file && (
                  <img id="img" src="../../static/fileIcon.png" alt="file" />
                )}

                <p id="span">{video.video.duration}</p>
              </Fragment>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

class VideoColumn extends Component {
  state = this.props;

  render() {
    const { section, videos, files, id } = this.state;
    const { show, data } = this.props;
    return (
      <Container>
        {section.videoIds.map(item => {
          const video = videos[item];
          const file = files[item];
          if (show) {
            return (
              <InnerList
                key={item}
                data={data}
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
};

export default VideoColumn;

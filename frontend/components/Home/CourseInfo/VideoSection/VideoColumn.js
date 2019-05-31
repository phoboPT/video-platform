/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../../VideoManager/VideoPlayer';

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
      order: 3;
      float: left;
      margin: auto 1rem;
      min-width: 30px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    #watch {
      order: 2;
      margin: auto 1rem;
    }
    #span {
      order: 4;
      width: 10%;
    }
  }
`;
class InnerList extends React.PureComponent {
  static propTypes = {
    item: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  openSwal = url => {
    const { title } = this.props.data.course;
    swal({
      text: `Preview of the course ${title}`,
      buttons: {
        cancel: 'OK',
      },
      content: <VideoPlayer url={url} />,
    }).then(willDelete => {
      if (!willDelete) {
        const element = document.getElementsByClassName('video-react-video')[0];
        element.pause();
      }
    });
  };

  render() {
    const {
      item,
      data,
      video: { freeToWatch },
    } = this.props;
    return (
      <div id="right">
        {data.course.videos.map(video => {
          if (video.video.id === item) {
            console.log(item);
            return (
              <Fragment key={item}>
                <p id="p">{video.video.title}</p>
                <div id="img">
                  {video.video.file && (
                    <img src="../../static/fileIcon.webp" alt="file" />
                  )}
                </div>
                <div id="watch">
                  {freeToWatch && (
                    <button
                      type="button"
                      onClick={() => this.openSwal(video.video.urlVideo)}
                    >
                      Watch
                    </button>
                  )}
                </div>

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

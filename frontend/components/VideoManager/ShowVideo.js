import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import VideoPlayer from './VideoPlayer';
import VideoSection from './VideoSection/VideoSection';
import SimpleUser from '../Authentication/SimpleUser';
import Loading from '../Static/Loading';
import calcProgress from '../../lib/calcProgress';

const SINGLE_VIDEO_QUERY = gql`
  query SINGLE_VIDEO_QUERY($id: ID) {
    course(where: { id: $id }) {
      id
      title
      createdAt
      section
      videos {
        video {
          id
          title
          urlVideo
          file
          duration
          freeToWatch
        }
      }
      user {
        id
        name
        videoUser {
          videoItem {
            watched
            video {
              id
            }
          }
        }
      }
    }
  }
`;

const Grid = styled.div`
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* css-3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
  word-break: break-all;
  white-space: normal;
  .container {
    background-color: ${props => props.theme.blue};
    line-height: 1.65;
    display: flex;
  }

  .video {
    min-width: 1000px;
    flex: 2;
    order: 1;
  }

  .info {
    display: inline-block;
    flex: 1;
    order: 2;
    .progress {
      word-break: normal;
      padding: 1rem;
      height: 50px;
      margin: 1rem;
    }
    .section {
    }
  }
`;

class ShowVideo extends Component {
  state = { hasUpdated: false, selectedVideo: '', percent: 0 };

  changeSelectedVideo = url => {
    const { videos } = this.state.course;

    videos.map(item => {
      if (item.video.id === url) {
        return this.setState({
          selectedVideo: item.video.urlVideo,
          id: url,
        });
      }
    });
  };

  updateState = () => {
    const { course, videoItem } = this.state;
    if (videoItem) {
      const newCourse = {
        course: { ...course },
        user: [...videoItem],
      };
      const res = calcProgress(newCourse, 2);
      this.setState(res);
    }
  };

  initialState = async (data, videoUser) => {
    const { hasUpdated } = this.state;

    await this.setState({
      hasUpdated: !hasUpdated,
    });
    await this.setState({
      selectedVideo: data.course.videos[0].video.urlVideo,
      id: data.course.videos[0].video.id,
    });
    if (videoUser) {
      await this.setState({ ...data, ...videoUser[0] });
    }
    this.updateState();
  };

  render() {
    const {
      selectedVideo,
      hasUpdated,
      id: key,
      percent,
      watched,
      total,
    } = this.state;
    const { id } = this.props;
    return (
      <SimpleUser>
        {({
          data: {
            me: { videoUser },
          },
        }) => (
          <Query query={SINGLE_VIDEO_QUERY} variables={{ id }}>
            {({ data, loading }) => {
              if (loading) return <Loading />;
              if (!data) return <p>`No Video Found for ${id}`</p>;
              if (data.course.videos.length > 0) {
                if (!hasUpdated) {
                  this.initialState(data, videoUser);
                }
              }
              return (
                <Grid>
                  <div className="container">
                    <div className="video">
                      <VideoPlayer url={selectedVideo} id={key} courseId={id} />
                    </div>
                    <div className="info">
                      <div className="progress">
                        <Progress percent={parseInt(percent)} width={50} />
                        <span className="progress">
                          {` Watched (${watched}) Total (${total})`}
                        </span>
                      </div>

                      <div className="section">
                        {selectedVideo !== 0 && (
                          <VideoSection
                            videosWatched={videoUser}
                            key={key}
                            data={data}
                            changeSelectedVideo={this.changeSelectedVideo}
                            id={key}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            }}
          </Query>
        )}
      </SimpleUser>
    );
  }
}

ShowVideo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShowVideo;
export { SINGLE_VIDEO_QUERY };

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
  white-space: normal;
  .container {
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
    margin-top: 2rem;
    flex: 1;
    border-radius: 10px;
    background-color: #f7f7f7;
    order: 2;
    .progress {
      word-break: normal;
      height: 50px;
      margin: 2rem;
    }
    .section {
    }
    #title {
      font-size: 20px;
      text-align: center;
    }
  }
`;

class ShowVideo extends Component {
  state = {
    hasUpdated: false,
    selectedVideo: '',
    percent: 0,
    controller: { active: 0, section: 'section-1' },
    index: 0,
  };

  changeSelectedVideo = async (url, selected, section) => {
    const { videos } = this.state.course;
    videos.map(async item => {
      if (item.video.id === url) {
        this.setState({
          selectedVideo: item.video.urlVideo,
          id: url,
          controller: { active: selected, section },
        });
      }
    });
  };

  updateState = async () => {
    const { course, videoItem } = this.state;
    if (videoItem) {
      const newCourse = {
        course: { ...course },
        user: [...videoItem],
      };
      const res = calcProgress(newCourse, 2);
      await this.setState(res);
    }
  };

  initialState = async (data, videoUser) => {
    const { hasUpdated } = this.state;

    await this.setState({
      hasUpdated: !hasUpdated,
    });

    const section = JSON.parse(data.course.section);
    const firstVideoId = section.sections['section-1'].videoIds[0];
    let url;
    let id;
    data.course.videos.map(item => {
      if (item.video.id === firstVideoId) {
        url = item.video.urlVideo;
        id = item.video.id;
      }
    });
    await this.setState({
      selectedVideo: url,
      id,
    });
    if (videoUser) {
      await this.setState({ ...data, ...videoUser[0] });
    }
    await this.updateState();
  };

  changeIndex = async () => {
    const { total, watched } = this.state;

    const newPercent = ((watched + 1) * 100) / total;
    await this.setState({ percent: newPercent, watched: watched + 1 });
  };

  render() {
    const {
      selectedVideo,
      hasUpdated,
      id: key,
      percent,
      watched,
      total,
      controller,
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
                      <VideoPlayer
                        url={selectedVideo}
                        id={key}
                        courseId={id}
                        changeIndex={this.changeIndex}
                        key={key}
                        className="videoPlayer"
                      />
                    </div>
                    <div className="info">
                      <p id="title">Course Content</p>
                      <div className="progress">
                        <Progress
                          percent={
                            isNaN(parseInt(percent)) ? 0 : parseInt(percent)
                          }
                          width={50}
                          key={key}
                        />
                        <span className="progress">
                          {`Watched (${watched || 0}) Total (${total || 0})`}
                        </span>
                      </div>

                      <div className="section">
                        {selectedVideo !== 0 && (
                          <VideoSection
                            controller={controller}
                            selected={selectedVideo}
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

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import VideoSection from './VideoSection/VideoSection';

const SINGLE_VIDEO_QUERY = gql`
  query SINGLE_VIDEO_QUERY($id: ID!) {
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
          watched
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
  margin: none;

  .container {
    background-color: #fff;
    margin: 40px auto 0 auto;
    line-height: 1.65;
    display: flex;
  }

  .video {
    min-width: 1000px;
    flex: 2;
    order: 1;
  }

  .info {
    flex: 1;
    order: 2;
  }
`;

class ShowVideo extends Component {
  state = { hasUpdated: false, selectedVideo: '' };

  changeSelectedVideo = url => {
    const { videos } = this.state;
    videos.map(item => {
      if (item.video.id === url) {
        return this.setState({
          selectedVideo: item.video.urlVideo,
          id: item.video.id,
        });
      }
      return item;
    });
  };

  render() {
    const { selectedVideo, hasUpdated, id: key } = this.state;
    const { id } = this.props;
    return (
      <Query query={SINGLE_VIDEO_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Video Found for {id}</p>;
          if (!hasUpdated) {
            this.setState(data.course);
            this.setState({
              hasUpdated: !hasUpdated,
              selectedVideo: data.course.videos[0].video.urlVideo,
              id: data.course.videos[0].video.id,
            });
          }
          return (
            <Grid>
              <div className="container">
                <div className="video">
                  <VideoPlayer url={selectedVideo} />
                </div>
                <div className="info">
                  {selectedVideo !== 0 && (
                    <VideoSection
                      key={key}
                      data={data}
                      changeSelectedVideo={this.changeSelectedVideo}
                      id={key}
                    />
                  )}
                </div>
              </div>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

ShowVideo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShowVideo;

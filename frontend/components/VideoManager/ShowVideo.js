import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import VideoSection from './VideoSection/VideoSection';
import SimpleUser from '../Authentication/SimpleUser';

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
    flex: 1;
    order: 2;
  }
`;

class ShowVideo extends Component {
  state = { hasUpdated: false, selectedVideo: '' };

  render() {
    const { selectedVideo, hasUpdated, id: key } = this.state;
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
                      <VideoPlayer url={selectedVideo} id={key} courseId={id} />
                    </div>
                    <div className="info">
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

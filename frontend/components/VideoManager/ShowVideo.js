import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import Index from '../InstructorArea/FormCourse/DragNDrop/Index';

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
  render() {
    return (
      <Query query={SINGLE_VIDEO_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Video Found for {this.props.id}</p>;
          const { videos } = data.course;

          console.log(data.course);
          return (
            <Grid>
              <div className="container">
                <div className="video">
                  <VideoPlayer url={videos[0].video.urlVideo} />
                </div>
                <div className="info">
                  <Index
                    sections={JSON.parse(data.course.section)}
                    isShow
                    courseId={data.course.id}
                  />
                </div>
              </div>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default ShowVideo;

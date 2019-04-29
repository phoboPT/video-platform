import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';

const SINGLE_VIDEO_QUERY = gql`
  query SINGLE_VIDEO_QUERY($id: ID!) {
    video(where: { id: $id }) {
      id
      title
      file
      urlVideo
      createdAt
    }
  }
`;

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  'word-wrap': 'wrap',
  padding: '0 1rem',
}));

const Grid = styled.div`
  .container {
    max-width: 1300px;
    background-color: #fff;
    margin: 40px auto 0 auto;
    line-height: 1.65;
    padding: 20px 50px;
    display: flex;
  }

  .video {
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
          if (!data.video) return <p>No Video Found for {this.props.id}</p>;

          return (
            <Grid>
              <div className="container">
                <div className="video">
                  <VideoPlayer url={data.video.urlVideo} />
                </div>
                <div className="info">
                  <p>Title: {data.video.title}</p>
                  <p>File: {data.video.file}</p>
                  <State
                    background={
                      data.video.state === 'Published' ? 'green' : 'red'
                    }
                    color="white"
                  >
                    {data.video.state}
                  </State>
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

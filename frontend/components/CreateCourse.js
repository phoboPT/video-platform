import React, { Component } from "react";
import { Query } from "react-apollo";
import { ALL_VIDEOS_USER } from "./Videos";
import VideoSelect from "./VideoSelect";
import styled from "styled-components";

const Item = styled.div``;

class CreateCourse extends Component {
  state = {
    videos: []
  };

  addVideo = e => {
    let isDiferent = true;
    this.state.videos.map(video => {
      if (video === e.target.id) {
        isDiferent = false;
      }
    });

    if (isDiferent) {
      this.setState({
        videos: [...this.state.videos, e.target.id]
      });
    }
  };
  render() {
    return (
      <>
        <p>Video Selection</p>

        <Query query={ALL_VIDEOS_USER}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <div>
                {data.videosUser.map(video => (
                  <Item>
                    <VideoSelect video={video} key={video.id}>
                      <button id={video.id} onClick={this.addVideo}>
                        Add
                      </button>
                    </VideoSelect>
                  </Item>
                ))}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default CreateCourse;

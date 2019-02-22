import React, { Component } from "react";
import { Query } from "react-apollo";
import { ALL_VIDEOS_USER } from "./Videos";
import VideoSelect from "./VideoSelect";
import styled from "styled-components";

const Item = styled.button`
  background-color: #44c767 !important;
  -moz-border-radius: 28px !important;
  -webkit-border-radius: 28px !important;
  border-radius: 28px !important;
  border: 1px solid #18ab29 !important;
  display: inline-block !important;
  cursor: pointer !important;
  color: #ffffff !important;
  padding: 16px 31px !important;
  text-decoration: none !important;
  text-shadow: 0px 1px 0px #2f6627 !important;

  &:hover {
    background-color: #5cbf2a !important;
  }
  &:active {
    position: relative !important;
    top: 1px !important;
  }
`;

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
                  <div>
                    <VideoSelect video={video} key={video.id}>
                      <Item id={video.id} onClick={this.addVideo}>
                        Add
                      </Item>
                    </VideoSelect>
                  </div>
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

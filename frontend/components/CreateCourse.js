import React, { Component } from "react";
import { Query } from "react-apollo";
import { ALL_VIDEOS_USER } from "./Videos";
import VideoSelect from "./VideoSelect";
import styled from "styled-components";
import Pagination from "./Pagination";

const ButtonAdd = styled.button`
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

const ButtonDelete = styled.button`
  background-color: #c93838 !important;
  -moz-border-radius: 28px !important;
  -webkit-border-radius: 28px !important;
  border-radius: 28px !important;
  border: 1px solid #db2e2e !important;
  display: inline-block !important;
  cursor: pointer !important;
  color: #ffffff !important;

  padding: 16px 31px !important;
  text-decoration: none !important;
  text-shadow: 0px 1px 0px #000000 !important;

  &:hover {
    background-color: #e08484 !important;
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
  removeVideo = e => {
    this.setState({
      videos: this.state.videos.filter(function(video) {
        return video !== e.target.id;
      })
    });
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
                  <div key={video.id}>
                    <VideoSelect video={video}>
                      {this.state.videos.includes(video.id) ? (
                        <ButtonDelete id={video.id} onClick={this.removeVideo}>
                          Delete
                        </ButtonDelete>
                      ) : (
                        <ButtonAdd id={video.id} onClick={this.addVideo}>
                          Add
                        </ButtonAdd>
                      )}
                    </VideoSelect>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </>
    );
  }
}

export default CreateCourse;

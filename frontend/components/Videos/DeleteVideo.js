import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_VIDEOS_USER } from "./Videos";

const DELETE_VIDEO_MUTATION = gql`
  mutation DELETE_VIDEO_MUTATION($id: ID!) {
    deleteVideo(id: $id) {
      id
    }
  }
`;

export class DeleteVideo extends Component {
  update = (cache, payload) => {
    //manually update the cache to reflet changes
    //Read cache for the Videos
    const data = cache.readQuery({ query: ALL_VIDEOS_USER });
    //Filter the selected video
    data.videosUser = data.videosUser.filter(
      video => video.id !== payload.data.deleteVideo.id
    );
    //Put the video back
    cache.writeQuery({ query: ALL_VIDEOS_USER, data });
  };

  render() {
    return (
      <>
        <Mutation
          update={this.update}
          mutation={DELETE_VIDEO_MUTATION}
          variables={{ id: this.props.id }}
        >
          {(deleteVideo, { error, loading }) => (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this Video?")) {
                  deleteVideo();
                }
              }}
            >
              {this.props.children}
            </button>
          )}
        </Mutation>
      </>
    );
  }
}

export default DeleteVideo;

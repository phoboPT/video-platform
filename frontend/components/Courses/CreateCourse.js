import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { ALL_VIDEOS_USER } from "../Videos";
import VideoSelect from "../VideoSelect";
import Pagination from "../Pagination";
import { perPage } from "../../config";
import { ButtonAdd, ButtonDelete } from "../styles/Buttons";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../ErrorMessage";
import Link from "next/link";
import AddVideo from "./AddVideo";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $videos: [ID]!
    # $target: String!
    $thumbnail: String!
    $description: String!
  ) {
    createCourse(
      title: $title
      videos: $videos
      # target: $target
      thumbnail: $thumbnail
      description: $description
    ) {
      id
    }
  }
`;

class CreateCourse extends Component {
  state = {
    ...this.props.state,
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
        <Pagination page={this.props.page} />
        <Query
          query={ALL_VIDEOS_USER}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return data.videosUser.map(video => (
              <div key={video.id}>
                <VideoSelect page={this.props.page} video={video}>
                  <AddVideo courseId={this.state.courseId} id={video.id} />
                </VideoSelect>
              </div>
            ));
          }}
        </Query>
        <Link href="/">
          <a>Finish</a>
        </Link>
      </>
    );
  }
}

export default CreateCourse;

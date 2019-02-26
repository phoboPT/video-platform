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

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String
    $videos: ID!
  ) # $target: String!
  # $thumbnail: String
  # $description: String!
  {
    createCourse(
      title: $title
      videos: $videos # target: $target
    ) # thumbnail: $thumbnail
    # description: $description
    {
      id
    }
  }
`;

class CreateCourse extends Component {
  state = {
    description: this.props.description,
    state: this.props.state,
    target: this.props.target,
    thumbnail: this.props.thumbnail,
    title: this.props.title,
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
            return (
              <Mutation
                mutation={CREATE_COURSE_MUTATION}
                variables={this.state}
              >
                {(createCourse, { isLoading, isError }) => (
                  <Form
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await createCourse();
                      console.log(res);
                    }}
                  >
                    <Error error={isError} />
                    {data.videosUser.map(video => (
                      <div key={video.id}>
                        <VideoSelect page={this.props.page} video={video}>
                          {this.state.videos.includes(video.id) ? (
                            <ButtonDelete
                              id={video.id}
                              onClick={this.removeVideo}
                            >
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
                    <div>
                      <br />
                      <button type="submit">Save Course</button>
                    </div>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </>
    );
  }
}

export default CreateCourse;

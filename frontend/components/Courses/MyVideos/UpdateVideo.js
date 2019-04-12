import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Form from '../../styles/Form';
import Error from '../../Static/ErrorMessage';
import { CourseContainer } from '../MyCourses/Update/UpdateCourse';
import VideoPlayer from '../../VideoManager/VideoPlayer';

const SINGLE_VIDEO_QUERY = gql`
  query SINGLE_VIDEO_QUERY($id: ID!) {
    video(where: { id: $id }) {
      id
      title
      description
      urlVideo
    }
  }
`;

const UPDATE_VIDEO_MUTATION = gql`
  mutation UPDATE_VIDEO_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateVideo(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

class UpdateVideo extends Component {
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateVideo = async (e, updateVideoMutation) => {
    e.preventDefault();

    const res = await updateVideoMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query query={SINGLE_VIDEO_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.video) return <p>No Courses Found for {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_VIDEO_MUTATION} variables={this.state}>
              {(updateVideo, { loading, error }) => (
                <CourseContainer>
                  <div className="video-bar">
                    <VideoPlayer url={data.video.urlVideo} />
                  </div>
                  <div className="info-bar">
                    <Form onSubmit={e => this.updateVideo(e, updateVideo)}>
                      <Error error={error} />
                      <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Information</h2>
                        <label htmlFor="Title">
                          Title
                          <input
                            type="text"
                            name="title"
                            placeholder="title"
                            defaultValue={data.video.title}
                            onChange={this.handleChange}
                          />
                        </label>
                        <label htmlFor="description">
                          Description
                          <input
                            type="text"
                            name="description"
                            placeholder="description"
                            defaultValue={data.video.description}
                            onChange={this.handleChange}
                          />
                        </label>

                        <button type="submit">
                          Sav{loading ? 'ing' : 'e'} To Course
                        </button>
                      </fieldset>
                    </Form>
                  </div>
                </CourseContainer>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateVideo;

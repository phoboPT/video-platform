import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from '../Static/ErrorMessage';

const UPDATE_VIDEO_MUTATION = gql`
  mutation UPDATE_VIDEO_MUTATION($id: ID!, $watched: Boolean) {
    updateVideoUser(id: $id, watched: $watched) {
      id
    }
  }
`;

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
          watched
        }
      }
    }
  }
`;

const Style = styled.div`
  button {
    visibility: hidden;
    display: none;
  }
`;

class UpdateVideo extends Component {
  state = { hasUpdated: false };

  componentDidUpdate() {
    const formElementKey1Exists = document.getElementById('form');
    const { courseId } = this.props;
    const { hasUpdated } = this.state;
    if (formElementKey1Exists && courseId && !hasUpdated) {
      formElementKey1Exists.click();
    }
  }

  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({
      query: SINGLE_VIDEO_QUERY,
      variables: { id: this.props.id },
    });

    // 2. Filter the deleted itemout of the page
    data.course = data.course.filter(
      item => item.id !== payload.data.deleteRateCourse.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: SINGLE_VIDEO_QUERY,
      data,
      variables: { id: this.props.id },
    });
  };

  updateState = async (e, mutation) => {
    e.preventDefault();

    await this.setState({ hasUpdated: true });
    await mutation();
  };

  render() {
    const { courseId: id } = this.props;
    return (
      <Mutation
        mutation={UPDATE_VIDEO_MUTATION}
        variables={this.props}
        // update={this.update}
        // optimisticResponse={{
        //   __typename: 'Mutation',
        //   updateVideo: {
        //     __typename: 'Course',
        //     id,
        //   },
        // }}
      >
        {(updateVideo, { error, loading, called }) => (
          <>
            <Error error={error} />
            <form onSubmit={e => this.updateState(e, updateVideo)}>
              <Style>
                <button id="form" type="submit" />
              </Style>
            </form>
          </>
        )}
      </Mutation>
    );
  }
}

UpdateVideo.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default UpdateVideo;

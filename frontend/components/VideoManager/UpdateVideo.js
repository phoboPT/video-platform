import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from '../Static/ErrorMessage';
import { CURRENT_USER_QUERY } from '../Authentication/SimpleUser';

const UPDATE_VIDEO_MUTATION = gql`
  mutation UPDATE_VIDEO_MUTATION($id: ID!, $watched: Boolean) {
    updateVideoUser(id: $id, watched: $watched) {
      id
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

  updateState = async (e, mutation) => {
    e.preventDefault();

    await this.setState({ hasUpdated: true });
    await mutation();
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_VIDEO_MUTATION}
        variables={this.props}
        update={this.update}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
        ]}
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

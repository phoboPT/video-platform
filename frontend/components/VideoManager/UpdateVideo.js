import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from '../Static/ErrorMessage';
import { CURRENT_USER_QUERY } from '../Authentication/User';
import { SIMPLE_USER_QUERY } from '../Authentication/SimpleUser';
import { SINGLE_VIDEO_QUERY } from './ShowVideo';

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
    const { changeIndex } = this.props;

    await this.setState({ hasUpdated: true });
    await mutation();
    changeIndex();
  };

  render() {
    const { courseId } = this.props;
    return (
      <Mutation
        mutation={UPDATE_VIDEO_MUTATION}
        variables={this.props}
        optimisticResponse={{
          __typename: 'Mutation',
          updateVideoUser: {
            __typename: 'VideoUser',
            id: this.props.id,
            watched: this.props.watched,
          },
        }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
          {
            query: SIMPLE_USER_QUERY,
          },
          {
            query: SINGLE_VIDEO_QUERY,
            variables: { id: courseId },
          },
        ]}
      >
        {updateVideo => (
          <>
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

import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $thumbnail: String) {
    updateUser(id: $id, thumbnail: $thumbnail) {
      id
      thumbnail
    }
  }
`;

const Container = styled.div`
  img {
    width: 150px;
    height: 150px;
  }
`;

class Photograph extends Component {
  state = {
    changeThumbnail: false,
    thumbnail: this.props.data.thumbnail,
  };

  uploadThumbnail = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'profilePics4');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deky2cxlm/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();
    this.setState({
      changeThumbnail: true,
      thumbnail: file.secure_url,
    });
  };

  update = async (e, updateUserMutation, userID) => {
    e.preventDefault();

    const res = await updateUserMutation({
      variables: {
        id: userID,
        ...this.state,
      },
    });
  };

  render() {
    const { changeThumbnail, thumbnail } = this.state;
    const { data } = this.props;
    return (
      <Container>
        <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
          {(updateUser, { loading, error }) => (
            <form onSubmit={e => this.update(e, updateUser, data.id)}>
              <p> Image viewer </p>

              <img alt="Placeholder" src={thumbnail} />

              <input
                type="file"
                name="thumbnail"
                placeholder="thumbnail"
                onChange={this.uploadThumbnail}
              />
              <button disables={changeThumbnail} type="submit">
                Save
              </button>
            </form>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default Photograph;

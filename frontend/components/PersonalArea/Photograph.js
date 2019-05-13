import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Static/Loading';
import Error from '../Static/ErrorMessage';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $thumbnail: String) {
    updateUser(id: $id, thumbnail: $thumbnail) {
      id
      thumbnail
    }
  }
`;

const Container = styled.div`
  form {
    display: grid;
    margin-left: 1rem;
    border: 0.5px solid rgba(196, 196, 196, 0.7);
    #title {
      padding-top: 2rem;
      margin: auto;
    }

    #subtitle {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      margin: auto;
      border-bottom: 2px solid black;
      color: rgba(137, 137, 137, 0.5);
    }
    #title-form {
      color: #333333;
      padding-top: 2rem;
      margin: auto;
      padding-bottom: 2rem;
    }
    #img {
      img {
        width: 250px;
        height: 250px;
      }
      padding: 2rem;
      margin: auto;
      border: 2px solid black;
    }
    #input {
      padding-top: 2rem;
      margin: auto;
      padding-bottom: 2rem;
    }
  }
`;

class Photograph extends Component {
  state = {
    changeThumbnail: 'false',
    thumbnail: this.props.data.thumbnail,
  };

  uploadThumbnail = async (e, mutation, id) => {
    const { files } = e.target;
    const data = new FormData();
    e.preventDefault();
    data.append('file', files[0]);
    data.append('upload_preset', 'profilePics');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deky2cxlm/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    this.setState({
      changeThumbnail: 'true',
      thumbnail: file.secure_url,
    });

    await mutation({
      variables: {
        id,
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
          {(updateUser, { loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            return (
              <>
                <form disable={loading.toString()}>
                  <p id="title">Picture</p>
                  <p id="subtitle">Choose a Nice Picture to Your Profile</p>
                  <p id="title-form"> Image Preview </p>
                  <div id="img">
                    <img alt="Placeholder" src={thumbnail} />
                  </div>
                  <input
                    id="input"
                    type="file"
                    name="thumbnail"
                    placeholder="thumbnail"
                    onChange={e => this.uploadThumbnail(e, updateUser, data.id)}
                  />
                </form>
              </>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default Photograph;

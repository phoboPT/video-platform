import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import Error from '../../Static/ErrorMessage';
import { ALL_INTERESTS_QUERY_PAGINATION } from './InterestList';
import { Alert } from '../../styles/AlertStyles';
import validateExtension from '../../../lib/validateFileExtensions';
import { imageExtensions } from '../../../lib/formatExtensions';
import { ButtonStyle } from '../../styles/GoBackAdminButton';

const SAVE_INTEREST_MUTATION = gql`
  mutation SAVE_INTEREST_MUTATION($name: String!, $thumbnail: String!) {
    createInterest(name: $name, thumbnail: $thumbnail) {
      id
    }
  }
`;

const UPDATE_INTEREST_MUTATION = gql`
  mutation UPDATE_INTEREST_MUTATION(
    $id: ID!
    $name: String!
    $thumbnail: String
  ) {
    updateInterest(id: $id, name: $name, thumbnail: $thumbnail) {
      id
    }
  }
`;

class FormInterest extends Component {
  state = {
    name: this.props.item ? this.props.item.name : '',
    alreadyExecuted: false,
    changeThumbnail: false,
    once: false,
    thumbnail: '../../static/no-thumbnail.webp',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // this gets called as soon as we get a responde back from the server after a mutation
  update = (cache, payload) => {
    const { name, thumbnail } = this.state;
    const { skip } = this.props;
    // read the cache
    const data = cache.readQuery({
      query: ALL_INTERESTS_QUERY_PAGINATION,
      variables: { skip },
    });
    // remove item from cart

    const interestId = payload.data.updateInterest.id;
    data.interests = data.interests.map(item => {
      if (item.id === interestId) {
        item.name = name;
        item.thumbnail = thumbnail;
      }
      return item;
    });
    // write back to the cache
    cache.writeQuery({ query: ALL_INTERESTS_QUERY_PAGINATION, data });
  };

  uploadThumbnail = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'thumbnail');
    const fileName = files[0].name;

    const isValid = validateExtension(fileName, 'image');
    if (isValid) {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/deky2cxlm/image/upload',
        { method: 'POST', body: data }
      );

      const file = await res.json();
      await this.setState({


        changeThumbnail: true,
        thumbnail: file.secure_url,
      });
    } else {
      swal({
        title: 'Filename not Supported',
        content: (
          <Alert>
            <h3>List of Supported files</h3>
            <div className="content">
              {imageExtensions.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </Alert>
        ),
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    }
  };

  render() {
    const { item, isEdit, refetch, changePage } = this.props;
    const { name, thumbnail, changeThumbnail } = this.state;
    return (
      <Mutation
        mutation={UPDATE_INTEREST_MUTATION}
        variables={{ id: item ? item.id : '', name, thumbnail }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          updateInterest: {
            __typename: 'Interest',
            id: item ? item.id : '',
          },
        }}
      >
        {(updateInterest, { loading: updateLoading, error: updateError }) => (
          <Mutation mutation={SAVE_INTEREST_MUTATION} variables={this.state}>
            {(
              createInterest,
              { loading: createLoading, error: createError }
            ) => (
                <div>
                  <form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      if (isEdit) {
                        await updateInterest();
                        await this.setState({ name: '', thumbnail: '' });
                        changePage();
                      } else {
                        await createInterest();
                        refetch();
                        await this.setState({ name: '', thumbnail: '' });
                        changePage();
                      }
                    }}
                  >
                    {isEdit ? <h2>Edit</h2> : <h2>Add New</h2>}

                    <ButtonStyle type="button" onClick={changePage}>
                      ⬅ Go Back
                  </ButtonStyle>
                    <Error error={createError || updateError} />
                    <div id="form">
                      <button
                        type="submit"
                        disabled={createLoading || updateLoading}
                        id="saveButton"
                      >
                        Sav{createLoading || updateLoading ? 'ing' : 'e'}
                      </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <label htmlFor="name">
                      Name:
                    <input
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Name"
                        defaultValue={name}
                        onChange={this.saveToState}
                      />
                    </label>
                    <br />
                    <label htmlFor="thumbnail">
                      Thumbnail Preview {/* Thumbnail para o Edit */}
                      <br />
                      {isEdit &&
                        (changeThumbnail ? (
                          item.thumbnail && (
                            <img alt="Placeholder" height="150" src={thumbnail} />
                          )
                        ) : (
                            <img
                              alt="Placeholder"
                              height="150"
                              src={item.thumbnail}
                            />
                          ))}
                      {/* Thumbnail para o create */}
                      {!isEdit && (
                        <img alt="Placeholder" height="150" src={thumbnail} />
                      )}
                      <br />
                      <input
                        type="file"
                        name="thumbnail"
                        placeholder="thumbnail"
                        onChange={this.uploadThumbnail}
                      />
                    </label>
                  </form>
                </div>
              )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

FormInterest.propTypes = {
  skip: PropTypes.number.isRequired,
  item: PropTypes.object,
  isEdit: PropTypes.bool,
  refetch: PropTypes.func,
  changePage: PropTypes.func,
};

export default FormInterest;

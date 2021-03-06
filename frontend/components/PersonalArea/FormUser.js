import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from '../styles/Form';
import Error from '../Static/ErrorMessage';
import LinkStyle from '../styles/LinkStyle';
import { Container } from '../styles/Container';
import User from '../Authentication/User';
// import ReactQuill from "react-quill"; // ES6
import Editor from '../InstructorArea/Editor';

const Style = styled.div`
  margin-left: 2rem;
  button {
    color: #000000;
    background: none;
    font: inherit;
    padding-top: 10rem;
    padding-block-start: 10px;
    padding-block-end: 10px;
    cursor: pointer;
    width: auto;
    border: 0;
    text-align: center;
  }
  img {
    width: 200px;
    height: 250px;
  }
  #sidebar {
    border-left: none;
    vertical-align: center;
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $profession: String
    $description: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      profession: $profession
      description: $description
    ) {
      id
      name
      email
      profession
      description
    }
  }
`;

class UpdateUser extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  changeQuill = e => {
    this.setState({
      description: e,
    });
  };

  update = async (e, updateUserMutation, userID) => {
    e.preventDefault();
    const { changeManualView } = this.props;

    const res = await updateUserMutation({
      variables: {
        id: userID,
        ...this.state,
      },
    });
    if (res) {
      changeManualView(1);
    }
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <LinkStyle>
            <Style>
              <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
                {(updateUser, { loading, error }) => (
                  <Form onSubmit={e => this.update(e, updateUser, me.id)}>
                    <Error error={error} />

                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Edit My Account </h2>
                      <label htmlFor="Name">
                        Name
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          defaultValue={me.name}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="Email">
                        Email
                        <input
                          type="text"
                          name="email"
                          placeholder="email"
                          defaultValue={me.email}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="Profession">
                        Ocupation or Title
                        <input
                          type="text"
                          name="profession"
                          placeholder="profession"
                          defaultValue={me.profession}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <Editor
                          id="description"
                          data={me.description}
                          changeQuill={this.changeQuill}
                        />
                      </label>
                      <button type="submit">
                        Sav{loading ? 'ing' : 'e'} Alterations
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            </Style>
          </LinkStyle>
        )}
      </User>
    );
  }
}

export default UpdateUser;

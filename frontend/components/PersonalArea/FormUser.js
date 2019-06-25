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
  .container {
    padding: 5rem;
    .fields {
      margin: auto;
      padding: auto;

      text-align: center;
      label {
        text-align: left;
        p {
          padding: 0 0 0 0;
          margin: 0.2rem;
        }
      }
      input {
        max-width: 50%;
      }
    }

    .editor {
      text-align: left;
      margin: none;
    }
  }
  button {
    border-radius: 5px;
    height: 50px;
    width: 200px;
    text-align: center;
    margin: 2rem;
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 400;
    border: none;
    background: #27ad39;
    margin-top: 40px;
    cursor: pointer;
    color: white;
    :focus {
      outline: none;
    }
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
                    <div className="container">
                      <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Edit My Account </h2>
                        <div className="fields">
                          <label htmlFor="Name">
                            <p>Name</p>
                            <input
                              type="text"
                              name="name"
                              placeholder="name"
                              defaultValue={me.name}
                              onChange={this.handleChange}
                            />
                          </label>
                          <label htmlFor="Email">
                            <p>Email</p>
                            <input
                              type="text"
                              name="email"
                              placeholder="email"
                              defaultValue={me.email}
                              onChange={this.handleChange}
                            />
                          </label>
                          <label htmlFor="Profession">
                            <p>Ocupation or Title</p>
                            <input
                              type="text"
                              name="profession"
                              placeholder="profession"
                              defaultValue={me.profession}
                              onChange={this.handleChange}
                            />
                          </label>
                        </div>

                        <div className="editor">
                          <label htmlFor="description">
                            <p>Description</p>
                            <Editor
                              id="description"
                              data={me.description}
                              changeQuill={this.changeQuill}
                            />
                          </label>
                          <button type="submit">
                            Sav{loading ? 'ing' : 'e'} Alterations
                          </button>
                        </div>
                      </fieldset>
                    </div>
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

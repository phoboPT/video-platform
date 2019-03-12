import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";
import gql from "graphql-tag";
import Error from "../Static/ErrorMessage";
import { Mutation, Query } from "react-apollo";
import LinkStyle from "../styles/LinkStyle";
import Link from "next/link";
import { Container } from "../styles/Container";
import User from "../Authentication/User";

const Style = styled.div`
  button {
    color: #000000;
    background: none;
    font: inherit;
    padding-top: 10rem;
    padding-block-start: 10px;
    padding-block-end: 10px;
    /* border-block-end: 1px solid #d6dbe1; */
    /*border is optional*/
    cursor: pointer;
    width: auto;
    border: 0;
    text-align: center;
  }
  #sidebar {
    border-left: none;
    vertical-align: center;
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

class UpdateUser extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  update = async (e, updateUserMutation, userID) => {
    e.preventDefault();

    const res = await updateUserMutation({
      variables: {
        id: userID,
        ...this.state
      }
    });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <LinkStyle>
              <Style>
                <Container className="container">
                  <section id="main">
                    <img src="https://www.iamlivingit.com/front/images/user-img.jpg" />
                  </section>
                  <Mutation
                    mutation={UPDATE_USER_MUTATION}
                    variables={this.state}
                  >
                    {(updateUser, { loading, error }) => (
                      <Form onSubmit={e => this.update(e, updateUser, me.id)}>
                        <Error error={error} />

                        <fieldset disabled={loading} aria-busy={loading}>
                          <h2>Information</h2>
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
                            <input
                              type="text"
                              name="email"
                              placeholder="email"
                              defaultValue={me.email}
                              onChange={this.handleChange}
                            />
                          </label>
                          <button type="submit">
                            Sav{loading ? "ing" : "e"} Alterations
                          </button>
                        </fieldset>
                      </Form>
                    )}
                  </Mutation>
                </Container>
              </Style>
            </LinkStyle>
          );
        }}
      </User>
    );
  }
}

export default UpdateUser;

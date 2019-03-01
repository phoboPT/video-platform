import React, { Component } from "react";
import styled from "styled-components";
import Form from "../styles/Form";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import { Mutation, Query } from "react-apollo";
import LinkStyle from "../styles/LinkStyle";
import Link from "next/link";
import { Container } from "../styles/Container";
import User from "../Authentication/User";

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION(
    $id: ID!
    $password: String
    $confirmPassword: String
  ) {
    updatePassword(
      id: $id
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;
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
    width: 100%;
    vertical-align: center;
  }
`;

class UpdatePassword extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  update = async (e, updatePasswordMutation, userID) => {
    e.preventDefault();

    const res = await updatePasswordMutation({
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
                <Mutation
                  mutation={UPDATE_PASSWORD_MUTATION}
                  variables={this.state}
                >
                  {(updatePassword, { loading, error }) => (
                    <Form onSubmit={e => this.update(e, updatePassword, me.id)}>
                      <Error error={error} />
                      <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Change Password</h2>
                        <label htmlFor="Password">
                          <input
                            type="text"
                            name="password"
                            placeholder="New password"
                            defaultValue={me.password}
                            onChange={this.handleChange}
                            required
                          />
                        </label>
                        <label htmlFor="Confirm Password">
                          <input
                            type="text"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            required
                          />
                        </label>
                        <button type="submit">
                          Sav{loading ? "ing" : "e"} Alterations
                        </button>
                      </fieldset>
                    </Form>
                  )}
                </Mutation>
              </Style>
            </LinkStyle>
          );
        }}
      </User>
    );
  }
}

export default UpdatePassword;

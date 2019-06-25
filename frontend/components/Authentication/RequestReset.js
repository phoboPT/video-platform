import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Error from '../Static/ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const Style = styled.div`
  display: grid;

  input,
  input[placeholder] {
    text-align: center;
    font-size: 17px;
  }
  fieldset {
    margin: auto;
    border: none !important;
    width: 80%;
    display: grid;

    #h2 {
      border-bottom: 1px solid #c6dcff;
      padding-bottom: 2rem;
      text-align: center;
      color: #777777;
      font-size: 26px;
    }
    #message {
      text-align: center;
      margin: auto;
      padding-bottom: 2rem;
    }
    #email {
      margin: auto;
      border: 0.5px solid rgba(225, 220, 220, 1);
    }
    #reset {
      height: 30px;
      width: 200px;
      border: 0.5px solid rgba(225, 220, 220, 1);
      border-radius: 7px;
      margin: 2rem auto;
    }
  }
  #center {
    width: 30%;
    margin: auto auto 1rem auto;
    img {
      width: 130px;
    }
  }
`;
const ButtonStyle = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  button {
    background: none;
    border: none;
    font-size: 30px;
    line-height: 10px;
    color: #2c2f33;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;
class RequestReset extends Component {
  state = {
    email: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email } = this.state;
    const { changeView } = this.props;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <>
            <ButtonStyle>
              <button
                id="back"
                onClick={() => changeView(1)}
                type="button"
                name="go back to the last page"
              >
                ↶
              </button>
            </ButtonStyle>
            <Style>
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await reset();
                  this.setState({ email: '' });
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2 id="h2">Password Reset</h2>
                  <Error error={error} />
                  <div id="center">
                    <img alt="pw-icon" src="../../static/forgotPW.png" />
                  </div>
                  {!error && !loading && called ? (
                    <p id="message">
                      Success! Check your email for a reset link!
                    </p>
                  ) : (
                    <p id="message">
                      Enter your login email to find your account.
                    </p>
                  )}

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.saveToState}
                  />
                  <button
                    id="reset"
                    type="submit"
                    name="submit the form to request a password change"
                  >
                    Request Reset
                  </button>
                </fieldset>
              </form>
            </Style>
          </>
        )}
      </Mutation>
    );
  }
}

RequestReset.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default RequestReset;

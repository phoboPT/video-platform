import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import User, { CURRENT_USER_QUERY } from '../components/Authentication/User';

const EXECUTE_PAYPAL = gql`
  mutation EXECUTE_PAYPAL(
    $paymentId: String
    $token: String
    $payerId: String
  ) {
    executePaypal(paymentId: $paymentId, token: $token, payerId: $payerId) {
      message
    }
  }
`;

const Style = styled.div`
  button {
    visibility: hidden;
    display: none;
  }
`;

class success extends React.Component {
  state = { hasUpdated: false };

  componentDidMount() {
    const formElementKey1Exists = document.getElementById('form');
    const { hasUpdated } = this.state;
    if (formElementKey1Exists && !hasUpdated) {
      formElementKey1Exists.click();
    }
  }

  updateState = async (e, mutation) => {
    e.preventDefault();
    const res = await mutation();
    if (res) {
      await this.setState({ hasUpdated: true });
    }
  };

  handleClose = () => {
    window.opener.location.href = '/courses?afterBuyed=true';
    window.close();
  };

  render() {
    const { query } = this.props;
    const { hasUpdated } = this.state;

    return (
      <Mutation
        mutation={EXECUTE_PAYPAL}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{
          paymentId: query.paymentId,
          token: query.token,
          payerId: query.PayerID,
        }}
      >
        {executePaypal => (
          <>
            <form onSubmit={e => this.updateState(e, executePaypal)}>
              <Style>
                <button id="form" type="submit" />
                <h3>Success!! Items added to your account</h3>
                <p>You can now close this window</p>
              </Style>
            </form>

            {hasUpdated && (
              <button type="button" onClick={this.handleClose}>
                Close
              </button>
            )}
          </>
        )}
      </Mutation>
    );
  }
}

export default success;

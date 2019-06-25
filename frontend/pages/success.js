import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../components/Authentication/User';

const EXECUTE_PAYPAL = gql`
  mutation EXECUTE_PAYPAL(
    $paymentId: String
    $token: String
    $payerId: String
    $name: String
    $email: String
    $address: String
    $city: String
    $state: String
    $zipCode: String
    $country: ID
    $nif: Int
    $billId: ID
  ) {
    executePaypal(
      paymentId: $paymentId
      token: $token
      payerId: $payerId
      name: $name
      email: $email
      address: $address
      city: $city
      state: $state
      zipCode: $zipCode
      country: $country
      nif: $nif
      billId: $billId
    ) {
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

  async componentDidMount() {
    const formElementKey1Exists = document.getElementById('form');
    const { hasUpdated } = this.state;
    await this.setState(JSON.parse(localStorage.getItem('billData')));
    if (formElementKey1Exists && !hasUpdated) {
      formElementKey1Exists.click();
    }
  }

  updateState = async (e, mutation) => {
    const { query } = this.props;
    const { data } = this.state;
    e.preventDefault();
    const res = await mutation({
      variables: {
        paymentId: query.paymentId,
        token: query.token,
        payerId: query.PayerID,
        name: data.name || '',
        email: data.email || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
        country: data.country || '',
        billId: data.selectedBill || '',
      },
    });
    if (res) {
      await this.setState({ hasUpdated: true });
    }
  };

  handleClose = () => {
    window.opener.location.href = '/courses?afterBuyed=true';
    window.close();
  };

  render() {
    const { hasUpdated } = this.state;

    return (
      <Mutation
        mutation={EXECUTE_PAYPAL}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
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

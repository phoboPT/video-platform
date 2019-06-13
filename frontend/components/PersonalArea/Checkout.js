import gql from 'graphql-tag';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import swal from '@sweetalert/with-react';
import calcTotalPrice from '../../lib/calcTotalPrice';
import User, { CURRENT_USER_QUERY } from '../Authentication/User';
import { Alert } from '../styles/AlertStyles';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $token: String!
    $name: String
    $email: String
    $address: String
    $city: String
    $state: String
    $zipCode: String
    $country: ID
  ) {
    createOrder(
      token: $token
      name: $name
      email: $email
      address: $address
      city: $city
      state: $state
      zipCode: $zipCode
      country: $country
    ) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

class Checkout extends Component {
  onToken = async (res, createOrder) => {
    const { data } = this.props;
    NProgress.start();
    await createOrder({
      variables: {
        token: res.id,

        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
    }).catch(err => {
      swal({
        title: 'Error',
        content: (
          <Alert>
            <h3>Something went wrong</h3>
            <div className="content">
              <p>{err.message}</p>
            </div>
          </Alert>
        ),
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    });

    Router.push({
      pathname: '/courses?afterBuyed=true',
    });
  };

  render() {
    const { children, data } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart) * 100}
                currency="EUR"
                description={`Order of ${me.cart.length} items!`}
                email={me.email}
                image={me.cart[0].course && me.cart[0].course.thumbnail}
                name="Picus"
                stripeKey="pk_test_puZklfwe9Fq1Cx4b25xqqJsU"
                token={res => this.onToken(res, createOrder)}
              >
                {children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

Checkout.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Checkout;

import gql from "graphql-tag";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import calcTotalPrice from "../../lib/calcTotalPrice";
import User, { CURRENT_USER_QUERY } from "../Authentication/User";
import Error from "../Static/ErrorMessage";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
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

export class Checkout extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });

    Router.push({
      pathname: "/courses",
    });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (me.cart.length < 1) return null;

          return (
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
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default Checkout;

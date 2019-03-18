import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import User from "../Authentication/User";

export class CheckoutDetails extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <div>
              <p>Total {me.cart.length} items in your cart </p>
            </div>
          );
        }}
      </User>
    );
  }
}

export default CheckoutDetails;

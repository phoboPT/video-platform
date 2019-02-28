import React, { Component } from "react";
import User from "../Authentication/User";
import styled from "styled-components";

class AccountDetails extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <p>Name: {me.name}</p>
            <p>Email : {me.email}</p>
            <p>Id: {me.id}</p>
          </>
        )}
      </User>
    );
  }
}

export default AccountDetails;

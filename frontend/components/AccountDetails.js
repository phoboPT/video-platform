import React, { Component } from "react";
import User from "./User";
import styled from "styled-components";

class AccountDetails extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <p>Name: {me.name}</p>
            <p>teste</p>
          </>
        )}
      </User>
    );
  }
}

export default AccountDetails;

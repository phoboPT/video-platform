import React, { Component } from "react";
import User from "./User";

class AccountDetails extends Component {
  render() {
    return <User>{({ data: { me } }) => <p>Name: {me.name}</p>}</User>;
  }
}

export default AccountDetails;

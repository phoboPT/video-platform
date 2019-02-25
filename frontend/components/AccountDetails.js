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
<<<<<<< HEAD
            <p>teste</p>
=======
            <p>Teste</p>
>>>>>>> a4c1903dd89bdfb6347daf10c37610dad8d0d009
          </>
        )}
      </User>
    );
  }
}

export default AccountDetails;

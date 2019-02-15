import React, { Component } from 'react';
import styled from 'styled-components';
import Signin from '../client/components/Signin';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin: auto;
  width: 35%;
  padding: 10px;
`;

class Login extends Component {
  render() {
    return (
      <Columns>
        <Signin />
      </Columns>
    );
  }
}

export default Login;

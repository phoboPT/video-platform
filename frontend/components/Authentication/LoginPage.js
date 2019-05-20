import React, { Component } from 'react';
import styled from 'styled-components';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Signup from './Signup';

const Container = styled.div`
  width: 80%;
  height: 80%;
  margin: auto;
  input {
    border-radius: 7px;
    height: 40px;
    width: 300px;
  }
  form {
    background-image: linear-gradient(
      rgba(225, 239, 247, 0.7),
      rgb(249, 253, 255)
    );
    border: 0.5px solid rgb(249, 253, 255);
    border-radius: 25px;
  }
`;

class LoginPage extends Component {
  state = {
    view: 1,
  };

  changeView = id => {
    this.setState({ view: id });
  };

  render() {
    const { view } = this.state;
    return (
      <>
        <Container>
          {view === 1 && <Signin changeView={this.changeView} />}
          {view === 2 && <RequestReset changeView={this.changeView} />}
          {view === 3 && <Signup changeView={this.changeView} />}
        </Container>
      </>
    );
  }
}

export default LoginPage;

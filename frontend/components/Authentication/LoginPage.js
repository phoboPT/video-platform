import React, { Component } from 'react';
import styled from 'styled-components';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Signup from './Signup';

const Container = styled.div`
  max-width: 600px;
  max-height: 600px;
  margin: auto;
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
          {view === 2 && <RequestReset />}
          {view === 3 && <Signup />}
        </Container>
      </>
    );
  }
}

export default LoginPage;

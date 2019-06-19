import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Signup from './Signup';

const LOCAL_LOGIN_QUERY = gql`
  query {
    loginOpen @client
  }
`;

const TOGGLE_LOGIN_MUTATION = gql`
  mutation {
    toggleLogin @client
  }
`;

const AnimatedStyles = styled.span`
  transform-style: preserve-3d;
  .count-enter {
    transform: rotateY(180deg);
    transition: transform 2s ease;
  }

  .count-enter-active {
    transform: none;
  }
  .count-exit {
    transform: none;
  }
  .count-exit-active {
    transform: rotateY(-180deg);
    transition: transform 2s ease;
  }
`;
const Container = styled.div`
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  background: white;
  z-index: 5;
  right: 0;
  margin-right: 3rem;
  margin-top: 10rem;
  position: fixed;
  width: 20%;
  height: 500px;
  min-width: 400px;
  transform: translateX(110%);
  transition: all 0.2s;
  ${props => props.open && `transform: translateX(0);`};
  input {
    border-radius: 7px;
    height: 40px;
    width: 300px;
  }
  form {
    background: white;
    border: 0.5px solid rgb(249, 253, 255);
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background: black;
  margin-right: 2rem;
  color: white;
  font-size: 2rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
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
      <Query query={LOCAL_LOGIN_QUERY}>
        {({ data: { loginOpen } }) => (
          <Mutation mutation={TOGGLE_LOGIN_MUTATION}>
            {toggleLogin => (
              <AnimatedStyles>
                <TransitionGroup>
                  <CSSTransition
                    unmountOnExit
                    className="count"
                    classNames="count"
                    key={view}
                    timeout={{ enter: 450, exit: 450 }}
                  >
                    <Container open={loginOpen}>
                      <CloseButton title="close" onClick={toggleLogin}>
                        &times;
                      </CloseButton>
                      {view === 1 && <Signin changeView={this.changeView} />}
                      {view === 2 && (
                        <RequestReset changeView={this.changeView} />
                      )}
                      {view === 3 && <Signup changeView={this.changeView} />}
                    </Container>
                  </CSSTransition>
                </TransitionGroup>
              </AnimatedStyles>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default LoginPage;
export { LOCAL_LOGIN_QUERY, TOGGLE_LOGIN_MUTATION };

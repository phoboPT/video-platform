import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';
import Information from './Information';
import FormUser from './FormUser';
import FormPassword from './FormPassword';
import Interest from './Interests/Interest';
import UserPurchases from './MyPurchases/UserPurchases';
import Photograph from './Photograph';

const Container = styled.div`
  display: flex;
  #menu {
    display: grid;
    order: 1;
    max-height: 205px;
    margin-top: 1.5rem;
    padding-right: 0px;
    padding-left: 55px;
    button {
      text-align: left;
      margin-right: 1rem;
      color: #293a44;
      background: none;
      font: inherit;
      margin-top: 2rem;
      cursor: pointer;
      border: none;
      &:hover {
        background: #b8c7d1;
      }
      &:focus {
        outline: none;
      }
      &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }
  }

  #content {
    border-left: 1.5px solid #959ba5;
    padding-top: 2rem;
    flex: 4;
    order: 2;
  }
`;

class PersonalArea extends Component {
  state = {
    view: 1,
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id), selected: e.target.id });
  };

  changeManualView = id => {
    this.setState({
      view: id,
    });
  };

  render() {
    const { view } = this.state;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return <p>You can't be here, please Login first</p>;
          return (
            me.permission[0] !== 'Instructor' && (
              <Container>
                <div id="menu">
                  <button
                    id="1"
                    type="button"
                    disabled={view === 1}
                    onClick={this.changeView}
                  >
                    Information
                  </button>

                  <button
                    type="button"
                    id="3"
                    disabled={view === 3}
                    onClick={this.changeView}
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    id="6"
                    disabled={view === 6}
                    onClick={this.changeView}
                  >
                    Photograph
                  </button>
                  <button
                    id="4"
                    type="button"
                    disabled={view === 4}
                    onClick={this.changeView}
                  >
                    Customize your Interests
                  </button>
                  <button
                    id="5"
                    type="button"
                    disabled={view === 5}
                    onClick={this.changeView}
                  >
                    My Purchases 🛒
                  </button>
                </div>
                <div id="content">
                  {view === 1 && (
                    <Information changeManualView={this.changeManualView} />
                  )}
                  {view === 2 && (
                    <FormUser changeManualView={this.changeManualView} />
                  )}
                  {view === 3 && <FormPassword />}
                  {view === 4 && <Interest view={0} />}
                  {view === 5 && <UserPurchases />}
                  {view === 6 && <Photograph data={me} />}
                </div>
              </Container>
            )
          );
        }}
      </User>
    );
  }
}

export default PersonalArea;

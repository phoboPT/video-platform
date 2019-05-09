import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';

const Container = styled.div`
  display: flex;
  padding: 0 !important;
  img {
    margin-left: 25px;
    margin-right: 25px;
    float: left;
    flex: 1;
    order: 1;
    width: 150px;
    height: 200px;
  }
  #information {
    margin: auto;
    flex: 3;
    order: 2;
    color: #56595b !important;
  }
  #change-info {
    flex: 1;
    order: 3;
    display: flex;
    button {
      cursor: pointer;
      background: none;
      border: none;
      margin: auto auto 0;
      &:focus {
        outline: none;
      }
    }
  }
`;

class Information extends Component {
  render() {
    const { changeManualView } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <>
            {console.log('eu', me)}
            <Container>
              <img alt="User Default" src={me.thumbnail} />
              <div id="information">
                <p>Nome: {me.name}</p>
                <p>Email: {me.email}</p>
              </div>
              <div id="change-info">
                <button type="submit" onClick={() => changeManualView(2)}>
                  ✏️ Edit My Account{' '}
                </button>
              </div>
            </Container>
          </>
        )}
      </User>
    );
  }
}

export default Information;

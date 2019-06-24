import React, { Component } from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';

const Container = styled.div`
  display: flex;

  padding: 0 !important;
  div {
    margin-bottom: 1rem;
  }
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
    #strong {
      color: black;
    }
    span {
      line-height: 2.3rem;
    }
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
    const { changeManualView, me } = this.props;
    return (
      <>
        <Container>
          <img alt="User Default" src={me.thumbnail} />
          <div id="information">
            <div>
              <strong id="strong">Nome: </strong>
              <span> {me.name}</span>
            </div>
            <div>
              <strong id="strong">Email: </strong>
              <span> {me.email}</span>
            </div>
            <div>
              <strong id="strong">Occupation or title: </strong>
              <span> {me.profession || 'Profession'}</span>
            </div>

            <strong id="strong">About Me:</strong>
            <div>
              <Markdown escapeHtml={false} source={me.description} />
            </div>
          </div>
          <div id="change-info">
            <button type="submit" onClick={() => changeManualView(2)}>
              ✏️ Edit My Account
            </button>
          </div>
        </Container>
      </>
    );
  }
}

export default Information;

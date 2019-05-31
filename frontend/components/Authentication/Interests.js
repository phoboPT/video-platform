import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import User from './User';
import Interest from '../PersonalArea/Interests/Interest';

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  text-align: center;

  #NextButton {
    margin-block-start: 2rem;
    text-align: center;
    cursor: pointer;
    background: #cccccc;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 900;
    color: #212121;
    word-spacing: 5px;
    &:hover {
      background: #a8a8a8;
      color: #191919;
    }
    &:focus {
      outline: none;
    }
  }

  #subtitle {
    color: #303030;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 48px;
    word-spacing: 0px;
    margin-top: 7rem;
  }
`;
const Title = styled.p`
  color: #303030;
  text-align: center;
  font-size: 44px;
  font-weight: 500;
  line-height: 48px;
  word-spacing: 0px;
  margin: 3rem;
  strong {
    color: black;
  }
`;

export class Interests extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return 'You Need to be signed In';

          return (
            <Container>
              <Title>
                Welcome to Video Platform<strong> {me.name} </strong>
              </Title>
              <p id="subtitle">Choose Your Interests</p>

              <Interest view={1} />
              <button
                name="add interest to your account"
                type="button"
                id="NextButton"
                onClick={async e => {
                  e.preventDefault();
                  Router.push({
                    pathname: '/',
                  });
                }}
              >
                Next
              </button>
            </Container>
          );
        }}
      </User>
    );
  }
}

export default Interests;

import React, { Component } from 'react';
import styled from 'styled-components';

const Style = styled.div`
  width: 100%;
  text-align: center;
  img {
    margin-top: 8rem;
  }
`;
export class _error extends Component {
  render() {
    return (
      <Style>
        <img alt="Page Not Found" src="../static/error.webp" />
        <p> Sorry, this page could not be found !</p>
      </Style>
    );
  }
}

export default _error;

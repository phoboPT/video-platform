import React, { Component } from 'react';
import styled from 'styled-components';
import Index from '../DragNDrop/Index';

const Container = styled.div`
  margin: 1rem;
  width: 100%;
`;

class Media extends Component {
  render() {
    return (
      <Container>
        <h2>Create the Sections</h2>

        <br />
        <p>Sections</p>
        <Index />
      </Container>
    );
  }
}

export default Media;

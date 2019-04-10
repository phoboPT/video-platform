import React, { Component } from "react";
import styled from "styled-components";
import Teste from "../DragNDrop/Teste";

const Container = styled.div`
  margin: 1rem;
  width: 100%;
`;

export class Media extends Component {
  render() {
    return (
      <Container>
        <h2>Create the Sections</h2>

        <br />
        <p>Sections</p>
        <Teste />
      </Container>
    );
  }
}

export default Media;

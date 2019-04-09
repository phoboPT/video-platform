import React, { Component } from "react";
import styled from "styled-components";
import Section from "./Draggable/Section";
import Container from "./Droppable/Container";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;

const DroppabbleStyle = {
  backgroundColor: "#555",
  height: "400px",
  margin: "32px",
  width: "250px",
};

export class teste extends Component {
  render() {
    return (
      <Wrapper>
        <Container id="dr1" style={DroppabbleStyle}>
          <Section id="item1">
            <Item style={{ margin: "8px" }}>Section 1</Item>
          </Section>
          <Section id="item2">
            <Item style={{ margin: "8px" }}>Section 2</Item>
          </Section>
        </Container>
      </Wrapper>
    );
  }
}

export default teste;

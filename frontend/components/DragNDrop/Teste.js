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
  margin-bottom: 2rem !important;
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

export class Teste extends Component {
  state = {
    components: [],
    section: 1,
  };

  add = e => {
    let components = this.state.components;
    components.push(
      <Section id="item1">
        <Item style={{ margin: "8px" }}>Section {this.state.section}</Item>
      </Section>,
    );

    this.setState({
      components: [components],
      section: this.state.section + 1,
    });
  };
  render() {
    return (
      <Wrapper>
        <div>
          <button onClick={this.add}>+</button>
        </div>
        <Container id="dr1" style={DroppabbleStyle}>
          {this.state.components}
        </Container>
      </Wrapper>
    );
  }
}

export default Teste;

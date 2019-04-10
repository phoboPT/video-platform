import React, { Component } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
`;
class Overview extends Component {
  render() {
    return (
      <Container>
        <br />

        <p>About The Course:</p>

        <Markdown escapeHtml={false} source={this.props.data.description} />

        <p>Instructor</p>
        {this.props.data.user.name}
      </Container>
    );
  }
}

export default Overview;

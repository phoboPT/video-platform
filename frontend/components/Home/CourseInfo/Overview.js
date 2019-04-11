import React, { Component } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  #title {
    font-size: 24px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);
  }

  #description-title {
    padding-top: 10px;
    flex: 1;
    order: 1;
  }
  #description {
    order: 2;
    flex: 3;
  }
  #description-container {
    display: flex;
    border-bottom: 1px solid rgba(58, 58, 58, 0.6);
    padding-bottom: 10px;
  }
  #author-title {
    padding-top: 10px;
    flex: 1;
    order: 1;
  }
  #author {
    order: 2;
    flex: 3;
  }
  #author-container {
    display: flex;
    padding-bottom: 10px;
  }
`;
class Overview extends Component {
  render() {
    return (
      <Container>
        <br />
        <div id="title">
          <p>About The Course</p>
        </div>
        <div id="description-container">
          <div id="description-title">
            <p>Description</p>
          </div>
          <div id="description">
            <Markdown escapeHtml={false} source={this.props.data.description} />
          </div>
        </div>
        <div id="author-container">
          <div id="author-title">
            <p>Instructor</p>
          </div>
          <div id="author">
            <p>{this.props.data.user.name}</p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Overview;

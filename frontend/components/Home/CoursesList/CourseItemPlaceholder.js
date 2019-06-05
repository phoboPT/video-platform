import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const loadingTESTE = keyframes`
0% {
    opacity: 1;
  }
  40% {
    opacity: 0.2;
  }

  60%{
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }

`;

const Container = styled.div`
  background: lightgray;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius};

  .animation-skeleton {
    animation: ${loadingTESTE} 2s linear infinite !important;
  }

  #img {
    background: #fcfcfc;
    width: 90%;
    margin: 1rem auto auto auto;
    height: 190px;
    object-fit: cover;
  }
  p {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }

  #title-card {
    background: #f4f4f4;
    height: 20px;
    font-size: 17px;
    width: 70%;
    margin: auto;
  }

  #instructor-card {
    height: 10px;
    margin-left: 5px;
    margin-top: 1.5rem;
    width: 30%;
    background: #f4f4f4;
    margin-bottom: 1.8rem;
    text-align: left;
    padding-left: 5px;
  }

  #price-card {
    padding: 1rem;
    width: 100%;
    text-align: right;
    padding-right: 1rem;
  }

  #rating {
    margin-bottom: 1rem;
    width: 80%;
    background: #f4f4f4;
    text-align: left;
    margin-left: 1rem;
    padding: 1rem 1rem 1rem 0;
  }
  #buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 1px;
    min-height: 5rem;
    background: lightgray;
    & > * {
      background: #f4f4f4;
      border: 0;
      font-size: 1rem;
    }

    #p {
      min-width: 50px;
      min-height: 25px;
      margin: auto;
    }
  }
`;

class CourseItem extends Component {
  render() {
    return (
      <Container>
        <div id="img" />

        <br />
        <div id="title-card" className=" animation-skeleton" />

        <div id="instructor-card" className=" animation-skeleton" />

        <div id="rating" className=" animation-skeleton" />

        <div id="buttonList">
          <div id="p" className=" animation-skeleton" />

          <div id="p" className=" animation-skeleton" />
        </div>
      </Container>
    );
  }
}

export default CourseItem;

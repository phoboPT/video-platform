import React, { Component } from 'react';
import styled from 'styled-components';
import SimpleUser from '../components/Authentication/SimpleUser';
import Home from './home';

const Container = styled.div`
  .img-area {
    -webkit-background-size: cover;
    width: 100%;
    background-size: cover;
    background-position: center center;
    position: fixed;
    left: 0;
    right: 0;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    /* 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    */
    z-index: -1;
  }
  .text {
    padding: none;
    margin: none;
    text-align: center;
    color: #fff;
    padding-top: 0.1%;
    font-size: 3rem;
    z-index: 2;

    h1 {
    }
  }
`;

export class index extends Component {
  render() {
    return (
      <SimpleUser>
        {({ data }) => {
          if (data.me) return <Home />;
          return (
            <Container>
              <div>
                <img
                  className="img-area"
                  src="../static/backgroud.jpeg"
                  alt="background"
                />
              </div>
              <div className="text">
                <h1>Picus Creative Video Platform</h1>
              </div>
            </Container>
          );
        }}
      </SimpleUser>
    );
  }
}

export default index;

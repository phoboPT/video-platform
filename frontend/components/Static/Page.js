import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';

const theme = {
  black: '#2c2f33',
  blue: '#5bc0de',
  borderRadius: '10px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.09)',
  darkblue: '#428bca',
  green: '#5cb85c',
  lightGrey: '#99aab5',
  maxWidth: '1700px',
  red: '#d9534f',
  white: '#ffffff',
};

const StyledPage = styled.div`
  /* background: white; */
  color: ${props => props.theme.black};

  .footer {
    text-align: center;
    opacity: 0.5;
    width: 100%;
    height: 60px; /* Height of the footer */
    background-color: red;
    clear: both;
    position: relative;
    height: 40px;
    margin-top: -40px;
  }
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 10px;
    margin:0;
    padding:0;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1;
    font-family: 'radnika_next';
    &:after {
      content: '';
      display: block;
      height: 50px; /* Set same as footer's height */
    }
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }

  /* footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:60px;   /* Height of the footer */
   background:#6cf;
} */
`;

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner role="main">{children}</Inner>
          {/* <Footer role="contentinfo"/> */}
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

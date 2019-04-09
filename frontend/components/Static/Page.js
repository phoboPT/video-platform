import React, { Component } from "react";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  black: "#2c2f33",
  blue: "#5bc0de",
  borderRadius: "10px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
  darkblue: "#428bca",
  green: "#5cb85c",
  lightGrey: "#99aab5",
  maxWidth: "1500px",
  red: "#d9534f",
  white: "#ffffff",
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
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
   
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

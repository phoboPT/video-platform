import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  red: "#d9534f",
  white: "#f9f9f9",
  blue: "#5bc0de",
  green: "#5cb85c",
  darkblue: "#428bca",
  black: "#2c2f33",
  ligthGrey: "	#99aab5",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)"
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

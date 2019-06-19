/* eslint-disable react/display-name */
import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';

const LOCAL_SIDEBAR_QUERY = gql`
  query {
    sidebarState @client
  }
`;

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
  height: 80px;
`;

const Inner = styled.div`
  padding: 2rem;
  border: 2px solid red;
  margin-left: ${props => props.extended === 1 && '130px!important'};
  margin-left: ${props => props.extended === 2 && '200px!important'};
  max-width: ${props => props.theme.maxWidth};
  margin: 100px auto 0;
  min-height: calc(100vh - 210px);
  @media (max-width: 1300px) {
    margin-left: ${props => props.extended === 1 && '90px!important'};
    margin-right: 20px !important;
    margin: 150px auto 0;
    min-height: calc(100vh - 260px);
  }
  &::after {
    content: '';
  }
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    height:100%;
    box-sizing: border-box;
    font-size: 10px;
    margin:0;
    padding:0;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height:100%;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1;
    font-family: 'radnika_next';
    &:after {
      content: '';
      display: block;
      height: 60px; /* Set same as footer's height */
    }
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }

`;
const Composed = adopt({
  sidebarState: ({ render }) => (
    <Query query={LOCAL_SIDEBAR_QUERY}>{render}</Query>
  ),
});
class Page extends Component {
  // state = { isAdminPage: false };

  render() {
    const { children } = this.props;
    return (
      <Composed query={LOCAL_SIDEBAR_QUERY}>
        {({
          sidebarState: {
            data: { sidebarState },
            loading,
          },
        }) => {
          console.log('sidebar', sidebarState);
          if (loading) return <p>Loading...</p>;
          if (sidebarState)
            return (
              <ThemeProvider theme={theme}>
                <StyledPage>
                  <Meta />
                  <Header sidebarState={sidebarState} />
                  <Inner extended={sidebarState} role="main">
                    {children}
                  </Inner>
                  <Footer sidebarState={sidebarState} role="contentinfo" />
                </StyledPage>
              </ThemeProvider>
            );
        }}
      </Composed>
    );
  }
}

Page.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Page;

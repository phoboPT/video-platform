/* eslint-disable react/display-name */
import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';
import { TOGGLE_SIDEBAR_MUTATION } from '../Admin/AdminMenu';

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
  adminBarSizeSmall: '50px',
  adminBarSizeLarge: '150px',
};

const StyledPage = styled.div`
  height: 80px;
`;

const Inner = styled.div`
  padding: 0 2rem 2rem 2rem;
  margin-left: ${props => props.sidebarState === 1 && '130px!important'};
  margin-left: ${props => props.sidebarState === 2 && '200px!important'};

  max-width: ${props => props.theme.maxWidth};
  margin: 100px auto 0;
  min-height: calc(100vh - 210px);
  @media (max-width: 1300px) {
    margin-left: ${props => props.sidebarState === 1 && '90px!important'};

    margin-right: 20px !important;
    margin: 100px auto 0;
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
  toogleSidebar: ({ render }) => (
    <Mutation mutation={TOGGLE_SIDEBAR_MUTATION}>{render}</Mutation>
  ),
});
class Page extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      isAdminPage: JSON.parse(localStorage.getItem('isAdminPage')),
      extended: JSON.parse(localStorage.getItem('extended')),
    });
  }

  testeBar = (sidebarState, isAdminPage, extended) => {
    if (extended) {
      return isAdminPage && sidebarState === 3 ? 2 : sidebarState;
    }
    if (!extended) {
      return isAdminPage && sidebarState === 3 ? 1 : sidebarState;
    }
  };

  render() {
    const { children } = this.props;
    const { isAdminPage, extended } = this.state;
    return (
      <Composed query={LOCAL_SIDEBAR_QUERY}>
        {({
          sidebarState: {
            data: { sidebarState },
            loading,
          },
          toogleSidebar,
        }) => {
          if (loading) return <p>Loading...</p>;
          if (sidebarState)
            return (
              <ThemeProvider theme={theme}>
                <StyledPage>
                  <Meta />
                  <Header
                    sidebarState={this.testeBar(
                      sidebarState,
                      isAdminPage,
                      extended
                    )}
                  />
                  <Inner
                    sidebarState={this.testeBar(
                      sidebarState,
                      isAdminPage,
                      extended
                    )}
                    role="main"
                  >
                    {children}
                  </Inner>
                  <Footer
                    sidebarState={this.testeBar(
                      sidebarState,
                      isAdminPage,
                      extended
                    )}
                    role="contentinfo"
                  />
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

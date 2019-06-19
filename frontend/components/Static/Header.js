/* eslint-disable react/display-name */
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import Nav from './Nav';
import Cart from '../Home/Cart/Cart';
import Wishlist from '../Home/Wishlist/Wishlist';
import LoginPage from '../Authentication/LoginPage';

const LOCAL_SIDEBAR_QUERY = gql`
  query {
    sidebarState @client
  }
`;

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin: 2rem 0 0 2rem !important;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0 1rem;
    margin-top: 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
`;

const StyledHeader = styled.header`
  padding-left: ${props => props.extended};

  .bar {
    z-index: 5;
    background: white;
    width: 100%;
    position: fixed;
    -webkit-box-shadow: 0px 7px 18px -6px rgba(46, 39, 46, 0.77);
    -moz-box-shadow: 0px 7px 18px -6px rgba(46, 39, 46, 0.77);
    box-shadow: 0px 7px 18px -6px rgba(46, 39, 46, 0.77);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lithGrey};
  }
`;
const Composed = adopt({
  sidebarState: ({ render }) => (
    <Query query={LOCAL_SIDEBAR_QUERY}>{render}</Query>
  ),

  // user: ({ render }) => <User>{render}</User>,
});
class Header extends Component {
  state = { link: '/index' };

  componentDidMount() {
    this.setState({
      extended: JSON.parse(localStorage.getItem('extended')),
    });
  }

  changeLink = link => {
    this.setState({ link });
  };

  render() {
    const { link, extended } = this.state;
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
              <StyledHeader extended={sidebarState} role="banner">
                <div className="bar">
                  <Logo>
                    <Link href={link}>
                      <a>
                        <img alt="logo-picus" src="/static/logo.webp" />
                      </a>
                    </Link>
                  </Logo>
                  <Nav changeLink={this.changeLink} />
                </div>
                <div className="sub-bar" />
                <Cart />
                <Wishlist />
                <LoginPage />
                <div />
              </StyledHeader>
            );
        }}
      </Composed>
    );
  }
}

export default Header;
export { LOCAL_SIDEBAR_QUERY };

/* eslint-disable react/display-name */
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Component } from 'react';

import Nav from './Nav';
import Cart from '../Home/Cart/Cart';
import Wishlist from '../Home/Wishlist/Wishlist';
import LoginPage from '../Authentication/LoginPage';

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
  padding-left: 0px;
  padding-left: ${props => props.sidebarState === 1 && '40px'};
  padding-left: ${props => props.sidebarState === 2 && '150px'};

  #extended {
    button {
      font-weight: 930 !important;
      font-family: 'radnika_next' !important;
    }
    margin-right: ${props => props.sidebarState === 1 && '4rem!important'};
    margin-right: ${props => props.sidebarState === 2 && '15rem!important'};
  }

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

class Header extends Component {
  changeLink = link => {
    this.setState({ link });
  };

  render() {
    const { sidebarState } = this.props;
    return (
      <StyledHeader sidebarState={sidebarState} role="banner">
        <div className="bar">
          <Logo>
            <a>
              <img alt="logo-picus" src="/static/logo.webp" />
            </a>
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
  }
}

export default Header;

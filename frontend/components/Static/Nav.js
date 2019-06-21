import Link from 'next/link';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import Router from 'next/router';
import NavStyle from '../styles/NavStyle';
import User from '../Authentication/User';
import Signout from '../Authentication/Signout';
import { TOGGLE_CART_MUTATION } from '../Home/Cart/Cart';
import { TOGGLE_LOGIN_MUTATION } from '../Authentication/LoginPage';
import CartCount from '../Home/Cart/CartCount';
import { TOGGLE_SIDEBAR_MUTATION } from '../Admin/AdminMenu';

class Nav extends Component {
  state = { isAdminPage: false };

  componentDidMount() {
    this.setState({
      isAdminPage: JSON.parse(localStorage.getItem('isAdminPage')),
    });
  }

  changePage = page => {
    const { isAdminPage } = this.state;
    localStorage.setItem('isAdminPage', !isAdminPage);
    Router.push({
      pathname: `/${page}`,
    });
  };

  toggleSidebar = (mutation, size) => {
    const { extended } = this.state;
    this.setState({ extended: !extended });
    mutation({ variables: { sidebarState: size } });
  };

  render() {
    const { isAdminPage } = this.state;
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <NavStyle
              wishColor={me ? me.wishlist.length : ''}
              role="navigation"
            >
              {me &&
                (me.permission[0] !== 'ADMIN' && (
                  <>
                    <Link href="/index">
                      <a href="/index">Home</a>
                    </Link>
                  </>
                ))}

              {me && (
                <>
                  {me.permission[0] === 'INSTRUTOR' && (
                    <Link href="/instructor-area">
                      <a>Instructor Area</a>
                    </Link>
                  )}
                  {me.permission[0] === 'ADMIN' && (
                    <Mutation mutation={TOGGLE_SIDEBAR_MUTATION}>
                      {toggleSidebar => (
                        <>
                          <a>Hi , Admin {me.name}</a>
                          {!isAdminPage && (
                            <a
                              onClick={() => {
                                this.changePage('administrator');
                                this.toggleSidebar(toggleSidebar, 1);
                              }}
                            >
                              Admin Area
                            </a>
                          )}
                          {isAdminPage && (
                            <a
                              onClick={() => {
                                this.toggleSidebar(toggleSidebar, 3);
                                this.changePage('index');
                              }}
                            >
                              Home
                            </a>
                          )}
                          <div id="extended">
                            <Signout />
                          </div>
                        </>
                      )}
                    </Mutation>
                  )}

                  {(me.permission[0] === 'USER' ||
                    me.permission[0] === 'INSTRUTOR') && (
                    <>
                      <Link href="/courses">
                        <a> Courses </a>
                      </Link>

                      <div className="dropdown">
                        <a className="dropbtn">Hi, {me.name}</a>
                        <div className="dropdown-content">
                          <Link href="/account">
                            <a>My Account</a>
                          </Link>

                          <Signout />
                        </div>
                      </div>
                      <Mutation
                        mutation={TOGGLE_CART_MUTATION}
                        variables={{ cartOpen: 2 }}
                      >
                        {toggleCart => (
                          <>
                            <button
                              type="button"
                              id="svg-btn"
                              onClick={toggleCart}
                            >
                              <div className="svg">
                                <svg viewBox="0 0 32 32">
                                  <path
                                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                              c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                  />
                                </svg>
                              </div>
                              <CartCount count={me.wishlist.length} />
                            </button>
                          </>
                        )}
                      </Mutation>
                      <div id="cart">
                        <Mutation
                          mutation={TOGGLE_CART_MUTATION}
                          variables={{ cartOpen: 1 }}
                        >
                          {toggleCart => (
                            <button type="button" onClick={toggleCart}>
                              <img
                                id="cart"
                                alt="cart"
                                src="../../static/cart.webp"
                              />
                              <CartCount count={me.cart.length} />
                            </button>
                          )}
                        </Mutation>
                      </div>
                    </>
                  )}
                </>
              )}

              {!me && (
                <Mutation mutation={TOGGLE_LOGIN_MUTATION}>
                  {toggleLogin => (
                    <button
                      id="button-signin"
                      type="button"
                      onClick={toggleLogin}
                    >
                      Sign In
                    </button>
                  )}
                </Mutation>
              )}
            </NavStyle>
          </>
        )}
      </User>
    );
  }
}

export default Nav;

import Link from 'next/link';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import NavStyle from '../styles/NavStyle';
import User from '../Authentication/User';
import Signout from '../Authentication/Signout';
import { TOGGLE_CART_MUTATION } from '../Home/Cart/Cart';
import CartCount from '../Home/Cart/CartCount';

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <NavStyle role="navigation">
              <Link href="/index">
                <a>Home</a>
              </Link>

              {me && (
                <>
                  {me.permission[0] === 'INSTRUTOR' && (
                    <Link href="/instructor-area">
                      <a>Instructor Area</a>
                    </Link>
                  )}

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

                  <Mutation
                    mutation={TOGGLE_CART_MUTATION}
                    variables={{ cartOpen: 2 }}
                  >
                    {toggleCart => (
                      <>
                        <button type="button" onClick={toggleCart}>
                          <div className="svg">
                            <svg viewBox="0 0 32 32">
                              <path
                                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                              c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                              />
                            </svg>
                          </div>
                        </button>
                      </>
                    )}
                  </Mutation>
                </>
              )}

              {!me && (
                <>
                  <Link href="/signup">
                    <a>Sign In</a>
                  </Link>
                </>
              )}
            </NavStyle>
          </>
        )}
      </User>
    );
  }
}

export default Nav;

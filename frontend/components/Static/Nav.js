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

                  <Mutation mutation={TOGGLE_CART_MUTATION}>
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

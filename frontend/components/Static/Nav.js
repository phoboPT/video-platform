import Link from 'next/link';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import NavStyle from '../styles/NavStyle';
import User from '../Authentication/User';
import Signout from '../Authentication/Signout';
import { TOGGLE_CART_MUTATION } from '../Home/Cart/Cart';
import CartCount from '../Home/Cart/CartCount';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <>
        <NavStyle>
          <Link href="/">
            <a>Home</a>
          </Link>
          {me && (
            <>
              <Link href="/courses">
                <a>Instructor Area</a>
              </Link>

              <ul>
                <li>
                  <a>Hi, {me.name}</a>
                  <ul className="dropdown">
                    <li>
                      <Link href="/account">
                        <a>Account</a>
                      </Link>
                    </li>
                    <li>
                      <a href="#">
                        <Signout />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button type="button" onClick={toggleCart}>
                    My Cart
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

export default Nav;

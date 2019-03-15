import Link from "next/link";
import NavStyle from "../styles/NavStyle";
import styled from "styled-components";
import User from "../Authentication/User";
import Signout from "../Authentication/Signout";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";

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
                <a>Courses</a>
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
                {toggleCart => <button onClick={toggleCart}>My Cart</button>}
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

import Link from "next/link";
import NavStyle from "./styles/NavStyle";
import styled from "styled-components";
import User from "./User";
const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyle>
        <Link href="/">
          <a>Home</a>
        </Link>
        {me && (
          <>
            <Link href="/videos">
              <a>My Videos</a>
            </Link>
            <Link href="/courses">
              <a>My Courses</a>
            </Link>
            <Link href="/account">
              <a>Account</a>
            </Link>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyle>
    )}
  </User>
);

export default Nav;

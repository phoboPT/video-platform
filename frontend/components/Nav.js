import Link from "next/link";
import NavStyle from "./styles/NavStyle";
import styled from "styled-components";

const Nav = () => (
  <NavStyle>
    <Link href="/">
      <a>Home</a>
    </Link>

    <Link href="/videos">
      <a>My Videos</a>
    </Link>

    <Link href="/signup">
      <a>Sign In</a>
    </Link>
  </NavStyle>
);

export default Nav;

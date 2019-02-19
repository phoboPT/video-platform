import Link from "next/link";
import NavStyle from "./styles/NavStyle";
import styled from "styled-components";

const Nav = () => (
  <NavStyle>
    <Link href="/">
      <a>Videos</a>
    </Link>
    <Link href="/sell">
      <a>
        <img src="/static/shopping-cart.png" />
        <p />
      </a>
    </Link>
    <Link href="/sell">
      <a />
    </Link>
  </NavStyle>
);

export default Nav;

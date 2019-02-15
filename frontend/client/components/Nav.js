import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/index">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a> About</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signin">
      <a>Sign in</a>
    </Link>
  </NavStyles>
);

export default Nav;

import Link from "next/link";
import NavStyle from "./styles/NavStyle";
import styled from "styled-components";
import User from "./User";
const Nav = () => (
  <NavStyle>
    <User>
      {({ data: { me } }) => {
        console.log(me);
        if (me) return <p>{me.name}</p>;
        return null;
      }}
    </User>
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

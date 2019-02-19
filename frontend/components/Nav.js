import Link from "next/link";
import NavStyle from "./styles/NavStyle";

const Nav = () => (
  <NavStyle>
    <Link href="/">
      <a>Courses</a>
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

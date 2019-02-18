import Link from "next/link";

const Nav = () => (
  <div>
    <Link href="/sell">
      <a>Me</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Nav;

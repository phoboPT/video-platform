import Link from "next/link";
import NavStyle from "./styles/NavStyle";
import styled from "styled-components";
import User from "./User";
import Signout from "./Signout";
import Dropdown from "./styles/NavDropdown";

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

              <Dropdown>
                <nav role="navigation">
                  <ul>
                    <li>
                      <a href="#">Hi, {me.name}</a>
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
                </nav>
              </Dropdown>
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyle>
      </>
    )}
  </User>
);

export default Nav;

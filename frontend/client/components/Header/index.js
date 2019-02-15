import React, { PureComponent } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { pageRoutes } from '~/config/routes';
import styled from 'styled-components';
import Nav from '../Nav';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: #ff0000;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid #393939;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid #e1e1e1;
  }
`;

/**
 * Header
 */
class Header extends PureComponent {
  static propTypes = {
    /**
     * User information, in case it's logged in
     */
    isAuthenticated: PropTypes.bool,
  };

  render() {
    return (
      <header>
        <StyledHeader>
          <div className="bar">
            <Logo>
              <Link href="/">
                <a>Picus</a>
              </Link>
            </Logo>
            <Nav />
          </div>
          <div className="sub-bar">
            <p>search</p>
          </div>
        </StyledHeader>
      </header>
    );
  }
}

export default Header;

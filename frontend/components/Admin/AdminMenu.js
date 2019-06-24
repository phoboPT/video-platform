/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';

const TOGGLE_SIDEBAR_MUTATION = gql`
  mutation($sidebarState: Int) {
    toggleSidebar(sidebarState: $sidebarState) @client
  }
`;

const Menu = styled.div`
  padding-left: 1rem;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: red;
  width: 40px;
  position: fixed;
  a {
    display: block;
  }
`;
const MenuOpened = styled.div`
  padding-left: 1rem;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: blue;
  width: 150px;
  position: fixed;
  a {
    display: block;
  }
`;
class AdminMenu extends Component {
  state = {
    extended: false,
    showCategory: false,
    showInterest: false,
    showCountry: false,
    showInstrutor: false,
  };

  componentDidMount() {
    this.setState({
      extended: JSON.parse(localStorage.getItem('extended')),
      showCategory: JSON.parse(localStorage.getItem('showCategory')),
      showInterest: JSON.parse(localStorage.getItem('showInterest')),
      showCountry: JSON.parse(localStorage.getItem('showCountry')),
      showInstrutor: JSON.parse(localStorage.getItem('showInstrutor')),
    });
  }

  toggleSidebar = async (mutation, size) => {
    const { extended } = this.state;
    this.setState({ extended: !extended });
    localStorage.setItem('extended', !extended);
    await mutation({ variables: { sidebarState: size } });
  };

  changePage = e => {
    const { name } = e.target;
    const selectedItem = JSON.parse(localStorage.getItem(name));

    localStorage.setItem(name, !selectedItem);

    this.setState({
      [name]: true,
    });
  };

  render() {
    const { extended } = this.state;
    return (
      <Mutation mutation={TOGGLE_SIDEBAR_MUTATION}>
        {toggleSidebar => (
          <>
            {extended && (
              <MenuOpened>
                <button
                  type="button"
                  onClick={() => this.toggleSidebar(toggleSidebar, 1)}
                >
                  ...
                </button>
                <Link
                  href={{
                    pathname: '/category-list',
                    query: { page: 1 },
                  }}
                >
                  <a>Category</a>
                </Link>
                <Link
                  href={{
                    pathname: '/interest-list',
                    query: { page: 1 },
                  }}
                >
                  <a>Interest</a>
                </Link>
                <Link
                  href={{
                    pathname: '/country-list',
                    query: { page: 1 },
                  }}
                >
                  <a>Country</a>
                </Link>
                <Link
                  href={{
                    pathname: '/intrutor-list',
                    query: { page: 1 },
                  }}
                >
                  <a>Instrutor</a>
                </Link>
              </MenuOpened>
            )}
            {!extended && (
              <Menu>
                <button
                  type="button"
                  onClick={() => this.toggleSidebar(toggleSidebar, 2)}
                >
                  ...
                </button>
                <Link
                  href={{
                    pathname: '/category-list',
                    query: { page: 1 },
                  }}
                >
                  <a>😄</a>
                </Link>

                <Link
                  href={{
                    pathname: '/interest-list',
                    query: { page: 1 },
                  }}
                >
                  <a> 😠</a>
                </Link>
                <Link
                  href={{
                    pathname: '/country-list',
                    query: { page: 1 },
                  }}
                >
                  <a>😺</a>
                </Link>
                <Link
                  href={{
                    pathname: '/intrutor-list',
                    query: { page: 1 },
                  }}
                >
                  <a>🤖</a>
                </Link>
              </Menu>
            )}

            {/* {showCategory && (
              <div>
                <CategoryList page={page} />
              </div>
            )}
            {showInterest && (
              <div>
                <InterestList page={page} />
              </div>
            )}
            {showCountry && (
              <div>
                <p>Country</p>
              </div>
            )}
            {showInstrutor && (
              <div>
                <p>Instrutor</p>
              </div>
            )} */}
          </>
        )}
      </Mutation>
    );
  }
}

export default AdminMenu;

export { TOGGLE_SIDEBAR_MUTATION };

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
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: rgba(55, 53, 79, 0.7);
  width: 50px;
  position: fixed;
  a {
    padding: 1rem 0 0 1rem;
    display: block;
  }
  button {
    margin: auto;
    height: 25px;
    padding: 1rem;
    background: none;
    border: none;
    font-size: 15px;
    line-height: 10px;
    cursor: pointer;

    &focus {
      outline: none;
    }
  }
`;
const MenuOpened = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: rgba(55, 53, 79, 0.7);
  width: 150px;
  position: fixed;

  a {
    padding: 1rem 0 0 1rem;
    display: block;
  }
    button {
      padding:1rem;
    margin: auto;
    height: 25px;
    background: none;
    border: none;
    font-size: 15px;
    line-height: 10px;
    cursor: pointer;

    &focus {
      outline: none;
    }
`;
class AdminMenu extends Component {
  state = {};

  componentDidMount() {
    this.setState({ extended: JSON.parse(localStorage.getItem('extended')) });
  }

  toggleSidebar = async (mutation, size) => {
    const { extended } = this.state;
    this.setState({ extended: !extended });
    mutation({ variables: { sidebarState: size } });

    localStorage.setItem('extended', !extended);
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
                  <img
                    src="../../static/list-close.png"
                    alt="extend list button"
                  />
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
                    pathname: '/instrutor-list',
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
                  <img
                    src="../../static/list-open.png"
                    alt="extend list button"
                  />
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
                    pathname: '/instrutor-list',
                    query: { page: 1 },
                  }}
                >
                  <a>🤖</a>
                </Link>
              </Menu>
            )}
          </>
        )}
      </Mutation>
    );
  }
}

export default AdminMenu;

export { TOGGLE_SIDEBAR_MUTATION };

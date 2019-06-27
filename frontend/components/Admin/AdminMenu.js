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
  .extend {
    button {
      margin: auto;
      cursor: pointer;
      height: 25px;
      padding: 1rem;
      background: none;
      border: none;
      font-size: 15px;
      line-height: 10px;

      &:focus {
        outline: none;
      }
    }
  }
  .links {
    img {
      cursor: pointer;
      margin: auto;
      margin-top: 1rem;
      display: block;
      height: 27px;
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
  .extend {
    button {
      margin: auto;
      height: 25px;
      padding: 1rem;
      background: none;
      border: none;
      font-size: 15px;
      line-height: 10px;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }
  .option {
    display: flex;
    margin: 0.7rem 0 0.7rem 0;
    cursor: pointer;
    .first {
      order: 1;
      flex: 1;
      margin: auto;
      img {
        height: 27px;
        padding: 0 0 0 1rem;
      }
    }
    .second {
      order: 2;
      flex: 2;
      margin: auto;
      a {
      }
    }
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
    await mutation({ variables: { sidebarState: size } });

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
                <div className="extend">
                  <button
                    id="button"
                    type="button"
                    onClick={() => this.toggleSidebar(toggleSidebar, 1)}
                  >
                    <img
                      src="../../static/list-close.png"
                      alt="extend list button"
                    />
                  </button>
                </div>
                <div className="links">
                  <Link
                    href={{
                      pathname: '/category-list',
                      query: { page: 1 },
                    }}
                  >
                    <div className="option">
                      <div className="first">
                        <img src="../../static/category.png" alt="category" />
                      </div>

                      <div className="second">
                        <a>Category</a>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href={{
                      pathname: '/interest-list',
                      query: { page: 1 },
                    }}
                  >
                    <div className="option">
                      <div className="first">
                        <img src="../../static/interest.png" alt="interest" />
                      </div>

                      <div className="second">
                        <a>Interest</a>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={{
                      pathname: '/country-list',
                      query: { page: 1 },
                    }}
                  >
                    <div className="option">
                      <div className="first">
                        <img src="../../static/flag.png" alt="flag" />
                      </div>

                      <div className="second">
                        <a>Country</a>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href={{
                      pathname: '/instrutor-list',
                      query: { page: 1 },
                    }}
                  >
                    <div className="option">
                      <div className="first">
                        <img src="../../static/value.png" alt="instrutor" />
                      </div>

                      <div className="second">
                        <a>Instrutor</a>
                      </div>
                    </div>
                  </Link>
                </div>
              </MenuOpened>
            )}
            {!extended && (
              <Menu>
                <div className="extend">
                  <button
                    type="button"
                    onClick={() => this.toggleSidebar(toggleSidebar, 2)}
                  >
                    <img
                      src="../../static/list-open.png"
                      alt="extend list button"
                    />
                  </button>
                </div>
                <div className="links">
                  <Link
                    href={{
                      pathname: '/category-list',
                      query: { page: 1 },
                    }}
                  >
                    <img src="../../static/category.png" alt="category" />
                  </Link>

                  <Link
                    href={{
                      pathname: '/interest-list',
                      query: { page: 1 },
                    }}
                  >
                    <img src="../../static/interest.png" alt="interest" />
                  </Link>
                  <Link
                    href={{
                      pathname: '/country-list',
                      query: { page: 1 },
                    }}
                  >
                    <img src="../../static/flag.png" alt="flag" />
                  </Link>
                  <Link
                    href={{
                      pathname: '/instrutor-list',
                      query: { page: 1 },
                    }}
                  >
                    <img src="../../static/value.png" alt="instrutor" />
                  </Link>
                </div>
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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    });
  }

  toggleSidebar = (mutation, size) => {
    const { extended } = this.state;
    this.setState({ extended: !extended });
    mutation({ variables: { sidebarState: size } });
  };

  changePage = e => {
    const { name } = e.target;
    this.setState({
      showCategory: false,
      showInterest: false,
      showCountry: false,
      showInstrutor: false,
      [name]: !JSON.parse(e.target.getAttribute('data-value')),
    });
  };

  render() {
    const {
      extended,
      showCategory,
      showInterest,
      showCountry,
      showInstrutor,
    } = this.state;

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
                <a
                  onClick={this.changePage}
                  data-value={showCategory}
                  name="showCategory"
                >
                  Category
                </a>
                <a
                  onClick={this.changePage}
                  name="showInterest"
                  data-value={showInterest}
                >
                  Interest
                </a>
                <a
                  onClick={this.changePage}
                  name="showCountry"
                  data-value={showCountry}
                >
                  Country
                </a>
                <a
                  onClick={this.changePage}
                  name="showInstrutor"
                  data-value={showInstrutor}
                >
                  Instrutor
                </a>
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
                <a
                  onClick={this.changePage}
                  name="showCategory"
                  data-value={showCategory}
                >
                  😄
                </a>
                <a
                  onClick={this.changePage}
                  name="showInterest"
                  data-value={showInterest}
                >
                  😠
                </a>
                <a
                  onClick={this.changePage}
                  name="showCountry"
                  data-value={showCountry}
                >
                  😺
                </a>
                <a
                  onClick={this.changePage}
                  name="showInstrutor"
                  data-value={showInstrutor}
                >
                  🤖
                </a>
              </Menu>
            )}

            {showCategory && (
              <div>
                <p>Category</p>
              </div>
            )}
            {showInterest && (
              <div>
                <p>Interest</p>
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
            )}
          </>
        )}
      </Mutation>
    );
  }
}

export default AdminMenu;

export { TOGGLE_SIDEBAR_MUTATION };

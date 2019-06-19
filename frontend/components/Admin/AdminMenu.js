import React, { Component } from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  padding-left: 1rem;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: red;
  width: 40px;
  position: fixed;
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
`;
class AdminMenu extends Component {
  state = { extended: false };

  componentDidMount() {
    this.setState({
      extended: JSON.parse(localStorage.getItem('extended')),
    });
  }

  changePage = () => {
    const { extended } = this.state;
    localStorage.setItem('extended', !extended);
    this.setState({ extended: !extended });
  };

  render() {
    const { extended } = this.state;
    return (
      <>
        {extended && (
          <MenuOpened>
            <button type="button" onClick={this.changePage}>
              ...
            </button>
            <p>Estou Opened</p>
            <p>Estou Opened</p>
            <p>Estou Opened</p>
            <p>Estou Opened</p>
            <p>Estou Opened</p>
          </MenuOpened>
        )}
        {!extended && (
          <Menu>
            <button type="button" onClick={this.changePage}>
              ...
            </button>
            <p>😄</p>
            <p>😠</p>
            <p>😺</p>
            <p>🤖</p>
            <p>👻</p>
          </Menu>
        )}
      </>
    );
  }
}

export default AdminMenu;

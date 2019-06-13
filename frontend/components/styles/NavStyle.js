import styled from 'styled-components';

const NavStyle = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  #button-signin {
    font-family: inherit;
    font-weight: 930;
    cursor: pointer;
  }
  #cart {
    margin-right: 3rem;
    img {
      margin: 0;
    }
  }
  #svg-btn {
    margin-right: 1.5rem;
  }
  .svg {
    margin-left: 1rem;
    height: 32px;
    width: 32px;
    fill: ${props => (props.wishColor > 0 ? 'red' : 'gray')};
  }
  a,
  button {
    height: 80px;
    padding: 0rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1.4rem;
    background: none;
    border: 0;
    font-weight: 500;
    color: ${props => props.theme.black};
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }

    &:after {
      height: 2px;
      background: red;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  img {
    width: 33px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }

  /* dropdown menu css */

  .dropbtn {
    margin-right: 3rem;
    font-weight: 500;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 30px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: center;
    button {
      font-family: inherit;
      display: inline-block;
      height: 50px;
      width: 100%;
      font-weight: 930;
      cursor: pointer;
    }
    button:hover {
      background-color: #f1f1f1;
    }
  }

  .dropdown-content a {
    cursor: pointer;

    height: 50px;
    margin: auto !important;
    color: black;
    padding: 12px 16px !important;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
  }
`;

export default NavStyle;

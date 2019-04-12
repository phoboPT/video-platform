import styled from 'styled-components';

const NavStyle = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.5rem;
  a,
  button {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1.5rem;
    background: none;
    border: 0;
    font-weight: 900;
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
    width: 5rem;
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightGrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }

  ul {
    padding-right: 5rem;
    padding-left: 0rem;
    padding-bottom: 0rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    list-style: none;
    font-weight: 900;
    color: ${props => props.theme.black};
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    a {
      padding: 0rem 0rem 0rem 0rem;
    }

    @media (max-width: 700px) {
      width: calc(100% - 10px);
    }
  }
  li {
    display: block !important;
    float: left;
    padding: 1rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
  }

  li a {
  }

  li:hover {
    cursor: pointer;
  }

  ul li ul {
    background: #ffffff;
    box-shadow: 3px 5px #888888;
    visibility: hidden;
    opacity: 0;
    min-width: 4rem;
    position: absolute;
    z-index: 3;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left: 0;
    display: none;
    padding-right: 2rem;
  }

  ul li:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  ul li ul li {
    clear: both;
    width: 100%;
  }
`;

export default NavStyle;

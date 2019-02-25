import styled from "styled-components";

const Dropdown = styled.nav`
  ul {
    background: none;
    list-style: none !important;
    margin: 0 !important;
    padding-left: 0 !important;
  }

  li {
    background: none;
    display: block !important;
    float: left !important;
    padding: 1rem !important;
    position: relative !important;
    text-decoration: none !important;
    transition-duration: 1s !important;
  }

  li:hover {
    cursor: pointer !important;
  }

  ul li ul {
    background: #f6f7f8;
    position: absolute !important;
    transition: all 0.5s ease !important;
    margin-top: 1rem !important;
    left: 0 !important;
    display: none !important;
  }

  ul li:hover > ul,
  ul li ul:hover {
    visibility: visible !important;
    display: block !important;
  }
  ul li ul li {
    clear: both !important;
  }
`;

export default Dropdown;

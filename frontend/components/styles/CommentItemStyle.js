import styled from "styled-components";

const MenuDots = styled.ul`
  ul {
    padding-right: 5rem;
    padding-left: 0rem;
    padding-bottom: 0rem;
    list-style: none;
    font-weight: 600;
    font-size: 13px;
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
  .dropdown {
    padding: 0px;
  }
  li {
    display: block !important;
    float: left;
    padding: 1rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
  }

  li:hover {
    cursor: pointer;
  }

  .item {
    &:hover {
      background: #d8d8d8;
    }
  }

  ul li ul {
    background: #f7f7f7;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left: 0;
    display: none;
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

const List = styled.div`
  max-width: 1000px;
  margin: 30px auto 0 auto;
  padding-bottom: 25px;

  img {
    height: 30px;
    width: 40px;
    padding-right: 10px;
  }
  .left-side {
    box-sizing: border-box;
    flex-basis: 25%;
    #name {
      padding: 0px;
      color: #000000;
      font-size: 15px;
      font-weight: 700;
      word-spacing: 0px;
      line-height: 20px;
      white-space: pre-wrap;
    }
    p {
      font-size: 1.1rem;
      font-weight: 400;
      color: #606060;
      white-space: nowrap;
      text-decoration: none;
    }
  }
  .middle {
    box-sizing: border-box;
    flex-basis: 70%;
    margin: auto;
    #comment {
      color: #282828;
      font-size: 14px;
      font-weight: 700;
      word-spacing: 0px;
      line-height: 20px;
      white-space: pre-wrap;
    }
  }

  .right-side {
    box-sizing: border-box;
    flex-basis: 5%;
    margin: auto;
    button {
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      color: #2c2f33 !important;
      padding: 0;
      line-height: 1;
      font-family: "radnika_next";
      border: none;
      background: none;
      cursor: pointer;
      list-style: none;
    }
  }

  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`;

export { List, MenuDots };

import styled from 'styled-components';
import { Query } from 'react-apollo';

const StyleFooter = styled.div`
  bottom: 0;
  margin-top: 5rem;
  padding: 10px;
  margin-left: ${props => props.sidebarState === 1 && '40px!important'};
  margin-left: ${props => props.sidebarState === 2 && '150px!important'};

  display: flex;
  background: #e2e2e2;

  p {
    width: 50%;
    order: 1;
    text-align: right;
    color: black;
    font-size: 1.3rem;
  }

  #images {
    text-align: left;
    width: 50%;
    order: 2;
    margin: auto auto 0 2rem;
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 2rem !important;
    cursor: pointer;
  }
`;

const Footer = ({ sidebarState }) => (
  <StyleFooter sidebarState={sidebarState}>
    <p>Copyright © 2019 Picus Creative</p>
    <div id="images">
      <a href="https://www.facebook.com/picuscreative/">
        <img alt="fb-icon" src="../../static/fb-icon.png" />
      </a>
      <a href="https://picuscreative.com/">
        <img alt="picus-logo" src="../../static/picus-logo.jpg" />
      </a>
    </div>
  </StyleFooter>
);

export default Footer;

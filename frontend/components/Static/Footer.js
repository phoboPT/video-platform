import styled from 'styled-components';
import { Query } from 'react-apollo';
import { LOCAL_SIDEBAR_QUERY } from './Header';

const StyleFooter = styled.div`
  bottom: 0;
  margin: 5rem auto auto auto;
  padding: 10px;
  margin-left: ${props => props.sidebarState};

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

const Footer = () => (
  <Query query={LOCAL_SIDEBAR_QUERY}>
    {({ sidebarState, loading, error }) => {
      if (loading) return <p>Loading</p>;

      return (
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
    }}
  </Query>
);

export default Footer;

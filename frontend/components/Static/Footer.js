import styled from 'styled-components';

const StyleFooter = styled.div`
  bottom: 0;
  margin: 5rem auto auto auto;
  width: 100%;
  text-align: center;
  padding: 10px;
  display: flex;
  background: #e2e2e2;
  p {
    color: black;
    margin-left: 2rem;
  }
`;

const Footer = () => (
  <StyleFooter>
    <p>Copyright © 2019 Picus Creative</p>
  </StyleFooter>
);

export default Footer;

import styled from 'styled-components';

const StyleFooter = styled.div`
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  background: red;
`;

const Footer = () => (
  <StyleFooter>
    <p>Ruben Deus Footer </p>
  </StyleFooter>
);

export default Footer;

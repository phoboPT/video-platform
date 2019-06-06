import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 60%;
  right: 0;
  width: 25%;
  margin-top: 10rem;
  min-width: 400px;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 8;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  #container {
    height: 100%;
    display: flex;
    align-items: center;
    #empty-cart {
      width: 100%;
      text-align: center;
      p {
        font-family: 'Open Sans Condensed', sans-serif;
        text-align: center;
        font-size: 2.2rem;
        color: #a4a6a8;
      }
    }
  }
  header {
    border-bottom: 2px solid ${props => props.theme.black};
    padding-bottom: 1rem;
  }
  footer {
    border-top: 1px solid ${props => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: block;
    font-size: 2rem;
    font-weight: 900;
    text-align: center;
    #total {
      margin: auto;
      display: flex;
      width: 90%;
      #text {
        order: 1;
        flex: 1;
        text-align: left;
      }
      #value {
        order: 2;
      }
    }
    #button-checkout {
      width: 90%;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }
`;

export default CartStyles;

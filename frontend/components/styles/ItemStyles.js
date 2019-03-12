import styled from "styled-components";

const Item = styled.div`
  background: white;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius};
  img {
    border-top-left-radius: ${props => props.theme.borderRadius};
    border-top-right-radius: ${props => props.theme.borderRadius};
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 1rem;
    font-size: 1.5rem;
    margin: 0.5rem;
  }
  .price {
    padding-top: 3rem;
    text-align: right;
  }
  span {
    padding: 5px 1rem;
    font-size: 1.2rem;
    color: #6e6e79;
  }
  .buttonList {
    margin-top: 2rem;
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
    a {
      margin: auto;
    }
    p {
      margin: auto;
    }
  }
`;

export default Item;

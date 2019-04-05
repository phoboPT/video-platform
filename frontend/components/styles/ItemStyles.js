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
    height: 210px;
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
    font-size: 19px;
    padding-top: 1rem;
    text-align: right;
  }
  span {
    padding: 5px 1rem;
    font-size: 11px;
    color: #6e6e79;
  }
  .rating {
    span {
      color: red;
      font-size: 0.8rem;
      padding: 0rem 0rem 0.6rem 0.6rem;
    }
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    min-height: 5rem;
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      /* padding: 1rem; */
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

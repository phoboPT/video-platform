import styled from "styled-components";
const ItemList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  z-index: 1;
  max-width: ${props => props.theme.maxWidth};
  margin: 5rem;
  font-size: 1.5rem;
  img {
    width: 250px;
    height: 150px;
    align-self: center;
  }
  a {
    font-size: 3rem;
  }
`;

export default ItemList;

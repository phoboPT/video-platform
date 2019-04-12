import styled from 'styled-components';

const ItemList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
  z-index: 1;
  margin: 5rem;
  font-size: 1.5rem;
  text-align: center;
  flex-wrap: wrap;
`;

export default ItemList;

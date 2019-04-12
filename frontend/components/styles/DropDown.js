import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: relative;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
  :focus {
    outline: none;
  }
`;

const DropDownItem = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  z-index: 2;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    opacity: 0.8;
    border-bottom: 2px solid #dddddd;
    :focus {
      outline: none;
      opacity: 1;
      border-bottom: 2px solid #1c1c1c;
    }
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };

import styled from 'styled-components';

const ButtonAddStyle = styled.button`
  background-color: #44c767 !important;
  -moz-border-radius: 28px !important;
  -webkit-border-radius: 28px !important;
  border-radius: 28px !important;
  border: 1px solid #18ab29 !important;
  display: inline-block !important;
  cursor: pointer !important;
  color: #ffffff !important;
  padding: 16px 31px !important;
  text-decoration: none !important;
  text-shadow: 0px 1px 0px #2f6627 !important;

  &:hover {
    background-color: #5cbf2a !important;
  }
  &:active {
    position: relative !important;
    top: 1px !important;
  }
`;

const ButtonDeleteStyle = styled.button`
  background-color: #c93838 !important;
  -moz-border-radius: 28px !important;
  -webkit-border-radius: 28px !important;
  border-radius: 28px !important;
  border: 1px solid #db2e2e !important;
  display: inline-block !important;
  cursor: pointer !important;
  color: #ffffff !important;

  padding: 16px 31px !important;
  text-decoration: none !important;
  text-shadow: 0px 1px 0px #000000 !important;

  &:hover {
    background-color: #e08484 !important;
  }
  &:active {
    position: relative !important;
    top: 1px !important;
  }
`;

export { ButtonAddStyle };
export { ButtonDeleteStyle };

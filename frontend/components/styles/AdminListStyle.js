import styled from 'styled-components';

const Container = styled.div`
  h2 {
    text-align: left;
  }
  #button {
    text-align: right;
  }
  #img {
    padding-left: 1px;
    width: 10%;
    text-align: center;
  }

  #add-button {
    border-radius: 5px;
    height: 50px;
    width: 200px;
    text-align: center;
    margin: auto 2rem;
    font-size: 25px;
    font-weight: 400;
    border: none;
    background: #27ad39;
    cursor: pointer;
    color: white;
    :focus {
      outline: none;
    }
    :disabled {
      background: rgba(163, 163, 163, 0.5);
      cursor: not-allowed;
    }
  }

  #form {
    text-align: right;
    #saveButton {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin: auto 2rem;
      font-size: 25px;
      font-weight: 400;
      border: none;
      background: #27ad39;
      cursor: pointer;
      color: white;
      :focus {
        outline: none;
      }
      :disabled {
        background: rgba(163, 163, 163, 0.5);
        cursor: not-allowed;
      }
    }
  }
`;

const Table = styled.table`
  width: 80%;
  text-align: left;
  border-collapse: collapse;
  margin: 2rem auto 0 auto;
  #id {
    width: 20%;
  }

  #action {
    text-align: center;
    width: 5%;
    padding-left: 0px;
  }

  td,
  th {
    border: 1px solid #aaaaaa;
  }
  tbody td {
    font-size: 13px;
    padding-left: 1rem;
  }

  thead {
    background: #1c6ea4;
    background: -moz-linear-gradient(
      top,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    background: -webkit-linear-gradient(
      top,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    background: linear-gradient(
      to bottom,
      #5592bb 0%,
      #327cad 66%,
      #1c6ea4 100%
    );
    border-bottom: 2px solid #444444;
  }
  thead th {
    height: 3rem;
    padding-left: 1rem;
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    border-left: 2px solid #d0e4f5;
  }
  thead th:first-child {
    border-left: none;
  }

  tfoot {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background: #d0e4f5;
    background: -moz-linear-gradient(
      top,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    background: -webkit-linear-gradient(
      top,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    background: linear-gradient(
      to bottom,
      #dcebf7 0%,
      #d4e6f6 66%,
      #d0e4f5 100%
    );
    border-top: 2px solid #444444;
  }
  tfoot td {
    height: 3rem;
    font-size: 14px;
  }
  tfoot .links {
    text-align: right;
  }
  tfoot .links a {
    display: inline-block;
    background: #1c6ea4;
    color: #ffffff;
    padding: 2px 8px;
    border-radius: 5px;
  }
`;

export { Container, Table };

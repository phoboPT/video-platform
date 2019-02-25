import styled from "styled-components";

const LinkStyle = styled.div`
  background-color: ${props => props.theme.white};

  a {
    margin: 20px;
    text-align: center;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    /*border is optional*/
    cursor: pointer;
  }

  .container {
    text-align: center;
    width: 80%;
    margin: auto;
    overflow: hidden;
    border: 1px solid black;
  }

  #main {
    margin-top: 20px;
    float: left;
    width: 20%;
    padding: 0 30px;
    box-sizing: border-box;
  }

  #sidebar {
    border-left: 1px solid black;
    min-height: 150px;
    float: right;
    width: 80%;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    #main {
      width: 100%;
      float: none;
    }

    #sidebar {
      width: 100%;
      float: none;
    }
  }
`;

export default LinkStyle;

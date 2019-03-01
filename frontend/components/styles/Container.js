import styled from "styled-components";
const Container = styled.div`
  margin: auto;
  label {
    text-align: left;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  #main {
    width: 40%;
  }

  #sidebar {
    width: 60%;
  }
  button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
`;

export { Container };

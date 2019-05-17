import styled from 'styled-components';

const Container = styled.div`
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
    height: 190px;
    object-fit: cover;
    cursor: pointer;
  }
  p {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }

  #title-card {
    min-height: 40px;
    font-size: 17px;
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    text-align: center;
  }

  #instructor-card {
    font-size: 11px;
    margin-bottom: 1.8rem;
    text-align: left;
    padding-left: 5px;
    opacity: 0.4;
  }

  #price-card {
    padding: 1rem;

    width: 100%;
    text-align: right;
    padding-right: 1rem;
  }
  #rating {
    text-align: left;
    padding: 1rem 0 1rem 0;
    display: flex;
    span {
      color: #1f0063;
      padding: 0 0 0 0.2rem;
      font-size: 1.5rem;
    }
    .progress {
      padding: 0 0 0 1rem;
      margin: auto;

      span {
        color: rgba(85, 85, 85, 0.7);
        font-size: 1.2rem;
      }
    }
  }
  #buttonList {
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
    }
    a {
      margin: auto;
    }
    p {
      margin: auto;
    }
  }
`;
export default Container;

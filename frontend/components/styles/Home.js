import styled, { css, keyframes } from 'styled-components';

const Title = styled.p`
  margin-left: 30px;
  color: #505763;
  border-bottom: 2px solid #ccc;
  margin-top: 10rem;
  font-size: 20px;
  font-weight: 500;
  word-spacing: 0px;
  line-height: 22px;
`;

const Animation = keyframes`
   0%{
        transform: rotate(0) translateY(0);
        }
    28%{
        transform: rotate(0) translateY(0);
        opacity: 0.8;
        }
    51%{
        transform: rotate(0) translateY(-40px);
        opacity: 0.5;
        }
    80%{
        transform: rotate(0) translateY(0);
        opacity: 0.8;
        }
    100%{
        transform: rotate(0) translateY(0);
        opacity: 1;
        }

`;
const animationReady = css`
  animation: ${Animation} 1s forwards 0s ease;
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding-top: 1rem;
  grid-gap: 30px;
  margin-left: 30px;
  margin-right: 30px;
  max-width: ${props => props.theme.maxWidth};
`;

const Container = styled.div`
  .animation {
    ${animationReady}
  }
  #content-container {
    display: flex;
    .Left {
      float: left;
      order: 1;
    }
    .Right {
      float: right;
      order: 3;
    }
    #courses-list {
      flex: 2;
      order: 2;
    }
  }

  #arrow {
    width: 40px;
    height: 40px;
  }

  #arrowbutton {
    padding: 0;
    background: none;
    text-decoration: none;
    border: none;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
export { Container, CoursesList, Title };

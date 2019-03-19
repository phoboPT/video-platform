import styled, { css, keyframes } from "styled-components";

const Title = styled.p`
  margin-top: 6rem;
  margin-left: 30px;
  color: #505763;
  border-bottom: 2px solid #ccc;
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
  margin-block-end: 14rem;
  .animation {
    ${animationReady}
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
  .Left {
    float: left;
    position: relative;
  }
  .Right {
    float: right;
    position: relative;
  }
`;
export { Title, Container, CoursesList };

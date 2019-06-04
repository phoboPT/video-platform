import styled from 'styled-components';

const Style = styled.div`
  width: 100%;

  #loading {
    width: 15%;

    margin: auto;
  }
`;

const Loading = () => (
  <Style>
    <div id="loading">
      <img src="../static/loading.gif" alt="loading" />
    </div>
  </Style>
);

export default Loading;

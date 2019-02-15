import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Player,
  ControlBar,
  LoadingSpinner,
  ReplayControl,
  ForwardControl,
} from 'video-react';

const Div = styled.div`
  margin: 30px;
`;

class Video extends Component {
  render() {
    return (
      <Div>
        <Player width={800} height={600} fluid={false}>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          <LoadingSpinner />
          <ControlBar autoHide={true}>
            <ReplayControl seconds={5} order={2.1} />
            <ReplayControl seconds={10} order={2.2} />
            <ReplayControl seconds={30} order={2.3} />
            <ForwardControl seconds={5} order={3.1} />
            <ForwardControl seconds={10} order={3.2} />
            <ForwardControl seconds={30} order={3.3} />
          </ControlBar>
        </Player>
      </Div>
    );
  }
}

export default Video;

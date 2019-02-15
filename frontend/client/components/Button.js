import React, { Component } from 'react';
import styled from 'styled-components';
import { Player } from 'video-react';

const Button1 = styled.button`
  color: blue;
  font-size: 20px;
`;

const Button2 = styled(Button1)`
  font-size: 40;
  text-decoration: underline;
  color: red;
  border-style: circle;
  border-radius: 10px;
`;
const Div = styled.div`
  /* background-color: red; */
  height: 50%;
  width: 50%;
  .video-react-video {
    height: 50%;
    width: 50%;
  }
  .video-react-controls-enabled {
    height: 50%;
    width: 50%;
  }
  .video-react-paused {
    height: 50%;
    width: 50%;
  }
  .video-react-user-inactive {
    height: 50%;
    width: 50%;
  }
  .video-react-workinghover {
    height: 50%;
    width: 50%;
  }
  .video-react {
    height: 50%;
    width: 50%;
  }
`;

const click = (e) => {
  alert('clicou');
  // e.prevent.default();
};

class Button extends Component {
  state = {
    text: 'ja foste',
  };

  render() {
    return (
      <Div>
        <Player playsInline fluid={false}>
          <source
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            playsInline
            fluid={false}
          />
        </Player>
      </Div>
    );
  }
}

export default Button;

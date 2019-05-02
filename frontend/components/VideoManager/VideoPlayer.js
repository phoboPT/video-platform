import React, { Component } from 'react';
import {
  Player,
  ControlBar,
  LoadingSpinner,
  ReplayControl,
  ForwardControl,
} from 'video-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  margin: 30px;
`;

class VideoPlayer extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  state = this.props;

  componentDidUpdate(prevProps) {
    const { player } = this;
    const { changeShow, url } = this.props;
    if (url !== prevProps.url) {
      player.load();
      changeShow();
    }
  }

  render() {
    const { url } = this.props;
    return (
      <Div>
        <Player
          fluid
          ref={c => {
            this.player = c;
          }}
        >
          <source src={url} />
          <LoadingSpinner />
          <ControlBar autoHide>
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

VideoPlayer.propTypes = {
  changeShow: PropTypes.func.isRequired,
};

export default VideoPlayer;

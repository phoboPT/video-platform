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

import UpdateVideo from './UpdateVideo';

const Div = styled.div`
  margin: 30px;
`;

class VideoPlayer extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string,
    courseId: PropTypes.string.isRequired,
  };

  state = {
    ended: false,
  };

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = props;
  }

  componentDidMount() {
    const { player } = this;
    // subscribe state change
    player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentDidUpdate(prevProps) {
    const { player } = this;
    const { url } = this.props;
    if (url !== prevProps.url) {
      player.load();
    }
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({ ...state });
  }

  render() {
    const { url, id, courseId, pause, changeIndex } = this.props;
    const { player } = this;
    const { ended } = this.state;
    if (pause) {
      player.pause();
    }
    return (
      <Div>
        <>
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
          {ended && (
            <UpdateVideo
              id={id}
              watched={ended}
              courseId={courseId}
              changeIndex={changeIndex}
            />
          )}
        </>
      </Div>
    );
  }
}
VideoPlayer.propTypes = {
  pause: PropTypes.bool,
};

export default VideoPlayer;

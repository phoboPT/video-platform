import React, { Component } from "react";
import {
  Player,
  ControlBar,
  LoadingSpinner,
  ReplayControl,
  ForwardControl
} from "video-react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Div = styled.div`
  margin: 30px;
`;

class VideoPlayer extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    const { url } = this.props;
    return (
      <Div>
        <Player fluid={true}>
          <source src={url} />
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

export default VideoPlayer;

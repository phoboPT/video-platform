import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";

export class Video extends Component {
  static propTypes = { videos: PropTypes.object.isRequired };

  render() {
    const { videos } = this.props;
    return (
      <>
        <ItemStyles>
          <Title>
            <a>{videos.video.title}</a>
          </Title>
          <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
          <p>Descrição:{videos.video.description}</p>
        </ItemStyles>
      </>
    );
  }
}

export default Video;

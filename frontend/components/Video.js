import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import styled from "styled-components";

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  padding: "0 1rem"
}));

const Div = styled.div`
  text-align: center;
  span {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    line-height: 1.5;
    padding: 0.3rem 1rem;
  }
`;

const Img = styled.img``;

class Video extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired
  };

  render() {
    const { video } = this.props;

    return (
      <ItemStyles>
        <Title>
          <Link
            href={{
              pathname: "/video",
              query: { id: video.id }
            }}
          >
            <a>{video.title}</a>
          </Link>
        </Title>
        <br />
        <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
        <br />
        <Div>
          <span>
            Description: <State>{video.description}</State>
          </span>
          <span>
            State:
            <State
              background={video.state === "Published" ? "green" : "red"}
              color="white"
            >
              {video.state}
            </State>
          </span>
          <span>
            User: <State>{video.user.name}</State>
          </span>
          <span>
            Category: <State>{video.category.name}</State>
          </span>
        </Div>
      </ItemStyles>
    );
  }
}

export default Video;

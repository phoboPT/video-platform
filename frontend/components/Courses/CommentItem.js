import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";
import formatDate from "../../lib/formatDate";

const List = styled.div`
  max-width: 1000px;
  margin: 40px auto 0 auto;

  .call-out {
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    flex-basis: 50%;
    border-bottom: 1px solid lightgray;
  }

  span {
    padding-left: 15px;
  }
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`;

export class Video extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired
  };

  render() {
    const { comments } = this.props;

    return (
      <List>
        <div className="call-out">
          <span>{comments.user.name}</span>
          <a>{formatDate(comments.createdAt)}</a>
        </div>
        <div className="call-out">
          <span>{comments.comment}</span>
        </div>
      </List>
    );
  }
}

export default Video;

import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import formatDate from "../../../../lib/formatDate";
import User from "../../../Authentication/User";
import { List, MenuDots } from "../../../styles/CommentItemStyle";
import DeleteComment from "./DeleteComment";
import Rating from "./Rating";
import UpdateComment from "./UpdateComment";

const Style = styled.p`
  min-width: 150px;
`;

export class Video extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
  };
  state = {
    edit: false,
    rating: this.props.rating,
  };
  changeEdit = e => {
    this.setState({ edit: true });
  };

  changeState = e => {
    this.setState({ edit: false });
  };
  getRating = rating => {
    this.setState({ rating: rating });
  };
  render() {
    const { comments } = this.props;
    const Date = formatDate(comments.createdAt);
    return (
      <User>
        {({ data: { me } }) => (
          <List>
            <div className="left-side">
              <a>
                <img src="../static/commentuser.png" />
              </a>
              <span id="name">{comments.user.name}</span>
              <p> Posted in: {Date}</p>
            </div>
            <div className="middle">
              {this.state.edit === true ? (
                <UpdateComment changeState={this.changeState} data={comments}>
                  <Rating
                    getRating={this.getRating}
                    initialValue={this.state.rating}
                  />
                </UpdateComment>
              ) : (
                <>
                  <span id="comment">{comments.comment}</span>
                  <Rating readOnly={true} initialValue={this.state.rating} />
                </>
              )}
            </div>
            <div className="right-side">
              {(me.id === comments.user.id && (
                <MenuDots>
                  <ul>
                    <li>
                      <a>
                        <img src="../static/threedots.png" />
                      </a>
                      <ul className="dropdown">
                        <li className="item">
                          <button onClick={this.changeEdit}>Edit</button>
                        </li>
                        <li className="item">
                          <DeleteComment data={comments}>Delete</DeleteComment>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </MenuDots>
              )) || <Style />}
            </div>
          </List>
        )}
      </User>
    );
  }
}

export default Video;

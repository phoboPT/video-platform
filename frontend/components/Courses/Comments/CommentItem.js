import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import formatDate from "../../../lib/formatDate";
import User from "../../Authentication/User";
import { MenuDots, List } from "../../styles/CommentItemStyle";

export class Video extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired
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
              <span id="comment">{comments.comment}</span>
            </div>
            {me.id === comments.user.id && (
              <div className="right-side">
                <MenuDots>
                  <ul>
                    <li>
                      <a>
                        <img src="../static/threedots.png" />
                      </a>
                      <ul className="dropdown">
                        <li className="item">
                          <Link href="#">
                            <a>Editar</a>
                          </Link>
                        </li>
                        <li className="item">
                          <button>delete</button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </MenuDots>
              </div>
            )}
          </List>
        )}
      </User>
    );
  }
}

export default Video;

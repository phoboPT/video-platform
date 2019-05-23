import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import formatDate from '../../../../lib/formatDate';
import User from '../../../Authentication/User';
import { List, MenuDots } from '../../../styles/CommentItemStyle';
import DeleteComment from './DeleteComment';
import Rating from './Rating';
import UpdateComment from './UpdateComment';

const Style = styled.p`
  min-width: 150px;
`;

class CommentItem extends Component {
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
    this.setState({ rating });
  };

  render() {
    const { comments, courseId, refetch } = this.props;
    const { edit, rating } = this.state;
    return (
      <User>
        {({ data: { me } }) => (
          <List>
            <div className="left-side">
              <a>
                <img src={me.thumbnail} alt="Profile Pic" />
              </a>
              <span id="name">{comments.user.name}</span>
              <p> Posted in: {formatDate(comments.createdAt)}</p>
            </div>
            <div className="middle">
              {edit === true ? (
                <UpdateComment
                  refetch={refetch}
                  changeState={this.changeState}
                  data={comments}
                  courseId={courseId}
                >
                  <Rating getRating={this.getRating} initialValue={rating} />
                </UpdateComment>
              ) : (
                <>
                  <div id="rating">
                    <Rating readOnly initialValue={rating} />
                  </div>
                  <div id="updateComment">
                    <span id="comment">{comments.comment}</span>
                  </div>
                </>
              )}
            </div>
            <div className="right-side">
              {(me &&
                (me.id === comments.user.id && (
                  <MenuDots>
                    <ul>
                      <li>
                        <a>
                          <img src="../static/threedots.png" alt="Options" />
                        </a>
                        <ul className="dropdown">
                          <li className="item">
                            <button type="button" onClick={this.changeEdit}>
                              Edit
                            </button>
                          </li>
                          <li className="item">
                            <DeleteComment data={comments}>
                              Delete
                            </DeleteComment>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </MenuDots>
                ))) || <Style />}
            </div>
          </List>
        )}
      </User>
    );
  }
}

CommentItem.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default CommentItem;

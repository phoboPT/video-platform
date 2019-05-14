import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import Error from '../../../Static/ErrorMessage';
import { ALL_COMMENTS_QUERY } from './ListComments';
import Rating from './Rating';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../../CoursesList/ListAllCourses';
import { CHECK_RATE_COURSE_QUERY } from '../ViewCourse';

const Style = styled.div`
  text-align: right;
  textarea {
    resize: none;
    overflow: auto;
    margin: 2rem;
    float: right;
    width: calc(100% - 35px);
    height: auto;
  }
  fieldset {
    border: none;
  }
  button {
    color: #ffffff;
    font-size: 17px;
    padding: 15px;
    padding-right: 2rem;
    background-color: #161616;
    text-decoration: none;
    cursor: pointer;
  }
  span {
  }
`;

const ADD_RATING = gql`
  mutation ADD_RATING($courseId: ID!, $comment: String!, $rating: Float!) {
    createRateCourse(courseId: $courseId, comment: $comment, rating: $rating) {
      id
    }
  }
`;

class CommentForm extends Component {
  state = {
    comment: '',
    courseId: this.props.data.id,
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getRating = rating => {
    this.setState({ rating });
  };

  saveData = async (mutation, e) => {
    const { rating } = this.state;
    e.preventDefault();
    if (rating) {
      const res = await mutation();
      this.setState({ comment: '' });
    } else {
      swal({
        title: 'No Rating',
        text: 'You have to give a rating to leave a comment!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    }
  };

  render() {
    const { courseId, comment } = this.state;
    return (
      <Mutation
        mutation={ADD_RATING}
        variables={this.state}
        refetchQueries={[
          {
            query: ALL_COMMENTS_QUERY,
            variables: { id: courseId },
          },
          {
            query: ALL_COURSES_QUERY,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
          {
            query: ALL_COURSES_ORDERED,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
          {
            query: ALL_COURSE_INTERESTS,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
          {
            query: CHECK_RATE_COURSE_QUERY,
            variables: { courseId },
          },
          {
            query: ALL_COURSES_RATING,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
        ]}
      >
        {(createComCourse, { error, loading }) => (
          <Style>
            <form
              onSubmit={async e => {
                e.preventDefault();
                this.saveData(createComCourse, e);
              }}
            >
              <Error error={error} />

              <div className="rating">
                <Rating
                  getRating={this.getRating}
                  initialValue="0"
                  readOnly={false}
                />
              </div>

              <fieldset aria-busy={loading} disabled={loading}>
                <textarea
                  id="comment"
                  name="comment"
                  onChange={this.saveState}
                  placeholder="Write your comment"
                  required
                  rows="6"
                  value={comment}
                />
                <button type="submit">Comment</button>
              </fieldset>
            </form>
          </Style>
        )}
      </Mutation>
    );
  }
}

export default CommentForm;

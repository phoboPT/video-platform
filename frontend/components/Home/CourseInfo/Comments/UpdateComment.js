import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Error from '../../../Static/ErrorMessage';
import { ALL_COMMENTS_QUERY } from './ListComments';
import {
  ALL_COURSE_INTERESTS,
  ALL_COURSES_ORDERED,
  ALL_COURSES_QUERY,
  ALL_COURSES_RATING,
} from '../../CoursesList/ListAllCourses';

import Loading from '../../../Static/Loading';

const Style = styled.div`
  button {
    color: #161616;
    font-size: 16px;
    font-weight: 700;
    margin: 20px;
    padding: 8px;
    background-color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    border: none;
  }
  button:hover {
    background: #e8e8e8;
  }
  input {
    height: 50px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: #1c1c1c;
    border: none;
    transition: 0.3s;
    outline: none;
    opacity: 0.6;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  }
  input:focus {
    opacity: 1;
    border-bottom: 2px solid #1c1c1c;
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 10px;
  }
`;

const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($id: ID!, $comment: String, $rate: Float) {
    updateRateCourse(id: $id, comment: $comment, rate: $rate) {
      id
      comment
      rate
    }
  }
`;

const SINGLE_COMMENT_QUERY = gql`
  query SINGLE_COMMENT_QUERY($id: ID!) {
    rateCourse(where: { id: $id }) {
      id
      comment
      rate
      course {
        id
      }
    }
  }
`;

class UpdateComment extends Component {
  state = { rate: this.props.children.props.initialValue };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  update = async (e, updateCommentMutation) => {
    const { data } = this.props;
    e.preventDefault();

    const res = await updateCommentMutation({
      variables: {
        id: data.id,
        ...this.state,
      },
    });
  };

  render() {
    const { rate } = this.state;
    const { children, data, changeState } = this.props;
    if (rate !== children.props.initialValue) {
      this.setState({ rate: children.props.initialValue });
    }
    return (
      <Query
        query={SINGLE_COMMENT_QUERY}
        variables={{ id: data.id }}
        refetchQueries={[
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
            query: ALL_COURSES_RATING,
            variables: { published: 'PUBLISHED', skip: 0 },
          },
        ]}
      >
        {({ data: newData, loading }) => {
          if (loading) return <Loading />;
          if (!newData) return <p>No Comments</p>;
          if (newData)
            return (
              <Style>
                <Mutation
                  mutation={UPDATE_COMMENT_MUTATION}
                  refetchQueries={[
                    {
                      query: ALL_COMMENTS_QUERY,
                      variables: { id: newData.rateCourse.course.id },
                    },
                  ]}
                >
                  {(updateCommentMutation, { error, loading }) => (
                    <form
                      onSubmit={e => {
                        this.update(e, updateCommentMutation);
                        changeState();
                      }}
                    >
                      <Error error={error} />

                      {children}
                      <fieldset aria-busy={loading} disabled={loading}>
                        <label htmlFor="comment">
                          <input
                            defaultValue={newData.rateCourse.comment}
                            name="comment"
                            onChange={this.handleChange}
                            placeholder="comment"
                            size="80"
                            type="text"
                            value={this.comment}
                          />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={changeState}>
                          Cancelar
                        </button>
                      </fieldset>
                    </form>
                  )}
                </Mutation>
              </Style>
            );
        }}
      </Query>
    );
  }
}

UpdateComment.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object,
  changeState: PropTypes.func.isRequired,
};

export default UpdateComment;

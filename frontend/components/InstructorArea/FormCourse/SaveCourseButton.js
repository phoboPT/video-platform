import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SINGLE_COURSE_QUERY } from './ChangeCourse';
import Error from '../../Static/ErrorMessage.js';
import { CURRENT_COURSES_QUERY } from '../MyCourses';

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String
    $thumbnail: String
    $description: String
    $price: Float
    $state: String
    $category: ID
    $id: ID
    $section: String
    $idsToDelete: [String]
  ) {
    saveCourse(
      title: $title
      thumbnail: $thumbnail
      description: $description
      price: $price
      category: $category
      state: $state
      id: $id
      section: $section
      idsToDelete: $idsToDelete
    ) {
      id
    }
  }
`;

const Style = styled.button`
  border-radius: 5px;
  height: 50px;
  width: 200px;
  text-align: center;
  margin: auto 2rem;
  font-size: 25px;
  font-weight: 400;
  border: none;
  background: #27ad39;
  cursor: pointer;
  color: white;
  :focus {
    outline: none;
  }
  :disabled {
    background: rgba(163, 163, 163, 0.5);
    cursor: not-allowed;
  }
`;
class SaveCourseButton extends Component {
  state = {
    ...this.props.data,
    section: JSON.stringify(this.props.sections),
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.sections) {
      if (currentState !== props.sections) {
        const state = {
          ...currentState,
          section: JSON.stringify(props.sections),
        };
        return state;
      }
    }
    if (currentState !== props.data) {
      return {
        ...props.data,
      };
    }
    return null;
  }

  updateCourse = async (e, updateCourseMutation) => {
    e.preventDefault();
    const { createCourse, changeToEdit, id, refetch } = this.props;
    if (this.props.data.videosToDelete) {
      await this.setState({
        idsToDelete: [...this.props.data.videosToDelete],
      });
    } else {
      await this.setState({ idsToDelete: [] });
    }
    const res = await updateCourseMutation({
      variables: {
        id,
        ...this.state,
      },
    });
    if (res) {
      refetch();
    }

    if (createCourse) {
      changeToEdit(res);
    }
  };

  render() {
    const { isUploading } = this.props;
    return (
      <Mutation
        mutation={CREATE_COURSE_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_COURSES_QUERY,
          },
        ]}
        variables={this.state}
      >
        {(updateCourse, { loading, error }) => (
          <>
            <Error error={error} />

            <form onSubmit={e => this.updateCourse(e, updateCourse)}>
              <Style
                id={loading ? 'submitLoading' : 'submit'}
                type="submit"
                disabled={loading || isUploading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Style>
            </form>
          </>
        )}
      </Mutation>
    );
  }
}

SaveCourseButton.propTypes = {
  id: PropTypes.string,
  changeToEdit: PropTypes.func,
  createCourse: PropTypes.bool,
  refetch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool,
};

export default SaveCourseButton;

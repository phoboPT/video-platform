import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { CURRENT_COURSES_QUERY } from '../MyCourses';
import Error from '../../Static/ErrorMessage.js';

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
  margin-top: 40px;
  margin: 0 auto;
  font-size: 25px;
  font-weight: 400;
  border: none;
  background: #27ad39;
  margin-top: 40px;
  cursor: pointer;
  color: white;
  :focus {
    outline: none;
  }
`;
class SaveCourseButton extends Component {
  state = {
    ...this.props.data,
    section: JSON.stringify(this.props.sections),
  };

  static getDerivedStateFromProps(props, currentState) {
    console.log('currentState', currentState, props.sections);
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

  componentDidMount() {
    if (this.props.sections) {
      //   this.setState({ section: JSON.stringify(this.props.sections) });
    }
  }

  //   componentWillReceiveProps(nextProps) {
  //     // You don't have to do this check first, but it can help prevent an unneeded render
  //       if (nextProps.data !== this.state) {

  //            const newState = {
  //         ...this.state,
  //        nextProps.data
  //         },
  //       };
  //       this.setState( newState);
  //     }
  // }

  updateCourse = async (e, updateCourseMutation) => {
    e.preventDefault();

    const res = await updateCourseMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_COURSE_MUTATION}
        refetchQueries={[{ query: CURRENT_COURSES_QUERY }]}
        variables={this.state}
      >
        {(updateCourse, { loading, error }) => (
          <>
            <Error error={error} />

            <form onSubmit={e => this.updateCourse(e, updateCourse)}>
              <Style
                id={loading ? 'submitLoading' : 'submit'}
                type="submit"
                disabled={loading}
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

export default SaveCourseButton;

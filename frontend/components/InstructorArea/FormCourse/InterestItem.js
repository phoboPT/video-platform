import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

const ADD_TAGS_COURSE = gql`
  mutation ADD_TAGS_COURSE($courseId: ID!, $interestId: ID!) {
    addTargetCourse(courseId: $courseId, interestId: $interestId) {
      id
    }
  }
`;

const ButtonStyle = styled.button`
  background-color: #44c767;
  -moz-border-radius: 28px;
  -webkit-border-radius: 28px;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  &:hover {
    background-color: #5cbf2a;
  }
  &:active {
    position: relative;
    top: 1px;
  }
  &:disabled {
    background-color: #99aab5;
    border: 1px solid #99aab5;
  }
`;

class InterestItem extends Component {
  state = {
    courseId: this.props.courseId,
    interestId: this.props.interest.id,
    isActive: false,
  };

  static propTypes = {
    courseId: PropTypes.string.isRequired,
    interest: PropTypes.object.isRequired,
  };

  updateState = e => {
    this.setState({ isActive: true });
  };

  render() {
    const { interest } = this.props;
    return (
      <Mutation
        mutation={ADD_TAGS_COURSE}
        variables={{
          courseId: this.state.courseId,
          interestId: this.state.interestId,
        }}
      >
        {(addTargetCourse, { loading }) => {
          if (loading) return <p>loading</p>;
          return (
            <ButtonStyle
              disabled={this.state.isActive}
              onClick={() => {
                addTargetCourse();
                this.updateState();
              }}
            >
              <p>hello</p>
              {interest.name}
            </ButtonStyle>
          );
        }}
      </Mutation>
    );
  }
}

export default InterestItem;

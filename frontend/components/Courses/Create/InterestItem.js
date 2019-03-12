import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
    interestId: this.props.interest.id,
    courseId: this.props.courseId,
    isActive: false
  };
  static propTypes = {
    interest: PropTypes.object.isRequired,
    courseId: PropTypes.string.isRequired
  };

  updateState = e => {
    console.log("hi");
    this.setState({ isActive: true });
  };

  render() {
    const { interest } = this.props;
    return (
      <Mutation mutation={ADD_TAGS_COURSE} variables={this.state}>
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
              {interest.name}
            </ButtonStyle>
          );
        }}
      </Mutation>
    );
  }
}

export default InterestItem;

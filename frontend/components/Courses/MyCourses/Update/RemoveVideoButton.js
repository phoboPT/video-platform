import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../../../Authentication/User";
import PropTypes from "prop-types";
import { SINGLE_COURSE_QUERY } from "./UpdateCourse";
import styled from "styled-components";

const REMOVE_VIDEO_COURSE = gql`
  mutation REMOVE_VIDEO_COURSE($id: ID!, $courseId: ID!) {
    removeFromCourse(id: $id, courseId: $courseId) {
      id
    }
  }
`;

const ButtonStyle = styled.button`
  -moz-box-shadow: inset 0px 39px 0px -24px #ff0d00;
  -webkit-box-shadow: inset 0px 39px 0px -24px #ff0d00;
  box-shadow: inset 0px 39px 0px -24px #ff0d00;
  background-color: #ff1605;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 14px;
  padding: 9px 15px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;

  &:hover {
    background-color: #ff0d00;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

class RemoveVideoButton extends Component {
  state = this.props.state;
  render() {
    const { id } = this.props;
    const { courseId } = this.props;
    return (
      <Mutation
        mutation={REMOVE_VIDEO_COURSE}
        variables={{
          id,
          courseId,
        }}
        refetchQueries={[
          { query: CURRENT_USER_QUERY },
          { query: SINGLE_COURSE_QUERY, variables: { id: courseId } },
        ]}
      >
        {(removeFromCourse, { loading }) => (
          <ButtonStyle disabled={loading} onClick={removeFromCourse}>
            Remov{loading ? "ing" : "e"}
          </ButtonStyle>
        )}
      </Mutation>
    );
  }
}

RemoveVideoButton.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default RemoveVideoButton;

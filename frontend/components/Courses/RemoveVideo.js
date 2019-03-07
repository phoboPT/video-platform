import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../Authentication/User";
import PropTypes from "prop-types";
import { SINGLE_COURSE_QUERY } from "./UpdateCourse";

const ADD_VIDEO_COURSE = gql`
  mutation ADD_VIDEO_COURSE($id: ID!, $courseId: ID!) {
    removeFromCourse(id: $id, courseId: $courseId) {
      id
    }
  }
`;

class AddVideo extends Component {
  state = this.props.state;
  render() {
    const { id } = this.props;
    const { courseId } = this.props;
    console.log(this.props);
    return (
      <Mutation
        mutation={ADD_VIDEO_COURSE}
        variables={{
          id,
          courseId
        }}
        refetchQueries={[
          { query: CURRENT_USER_QUERY },
          { query: SINGLE_COURSE_QUERY, variables: { id: courseId } }
        ]}
      >
        {(removeFromCourse, { loading }) => (
          <button disabled={loading} onClick={removeFromCourse}>
            Remov{loading ? "ing" : "e"} From Course
          </button>
        )}
      </Mutation>
    );
  }
}

AddVideo.propTypes = {
  courseId: PropTypes.string.isRequired
};

export default AddVideo;

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User";
import PropTypes from "prop-types";

const ADD_VIDEO_COURSE = gql`
  mutation ADD_VIDEO_COURSE($id: ID!, $courseId: ID!) {
    addToCourse(id: $id, courseId: $courseId) {
      id
    }
  }
`;

class AddVideo extends Component {
  state = this.props.state;
  render() {
    const { id } = this.props;
    const { courseId } = this.props;
    return (
      <Mutation
        mutation={ADD_VIDEO_COURSE}
        variables={{
          id,
          courseId
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCourse, { loading }) => (
          <button disabled={loading} onClick={addToCourse}>
            Add{loading && "ing"} To Course
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

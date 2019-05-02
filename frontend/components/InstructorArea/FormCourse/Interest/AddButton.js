import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { COURSE_QUERY } from './Interest';

const ADD_TAGS_COURSE = gql`
  mutation ADD_TAGS_COURSE($courseId: ID!, $interestId: ID!) {
    addTargetCourse(courseId: $courseId, interestId: $interestId) {
      id
    }
  }
`;

export class AddButton extends Component {
  state = {
    interestId: this.props.interestId,
    courseId: this.props.courseId,
  };

  static propTypes = {
    interestId: PropTypes.string.isRequired,
  };

  mutate = async mutation => {
    const res = await mutation();
    if (res) {
      this.props.changeTrue(res.data.addTargetCourse.id);
    }
  };

  render() {
    const { courseId } = this.props;
    return (
      <Mutation
        mutation={ADD_TAGS_COURSE}
        variables={this.state}
        refetchQueries={[
          {
            query: COURSE_QUERY,
            variables: {
              id: courseId,
            },
          },
        ]}
      >
        {(addTargetCourse, { loading }) => {
          if (loading) return <p />;
          return (
            <button
              type="button"
              onClick={e => {
                this.mutate(addTargetCourse);
              }}
            >
              Add
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default AddButton;

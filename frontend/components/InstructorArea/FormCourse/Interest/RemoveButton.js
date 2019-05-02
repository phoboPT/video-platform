import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { COURSE_QUERY } from './Interest';

const REMOVE_TAGS_COURSE = gql`
  mutation REMOVE_TAGS_COURSE($interestId: ID!) {
    removeTargetCourse(interestId: $interestId) {
      id
    }
  }
`;

export class RemoveButton extends Component {
  state = {
    interestId: this.props.interestId,
  };

  static propTypes = {
    interestId: PropTypes.string.isRequired,
  };

  mutate = async mutation => {
    const res = await mutation();
    if (res) {
      this.props.changeFalse();
    }
  };

  render() {
    const { courseId } = this.props;
    return (
      <>
        <Mutation
          mutation={REMOVE_TAGS_COURSE}
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
          {(removeTargetCourse, { loading }) => {
            if (loading) return <p />;
            return (
              <button
                type="button"
                onClick={e => {
                  this.mutate(removeTargetCourse);
                }}
              >
                Remove
              </button>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default RemoveButton;

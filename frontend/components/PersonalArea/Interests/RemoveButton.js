import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { ALL_INTEREST_QUERY } from './Interest';

const REMOVE_TAGS_COURSE = gql`
  mutation REMOVE_TAGS_COURSE($interestId: ID!) {
    removeTargetUser(interestId: $interestId) {
      id
    }
  }
`;

class RemoveButton extends Component {
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
    return (
      <>
        <Mutation
          mutation={REMOVE_TAGS_COURSE}
          variables={this.state}
          refetchQueries={[{ query: ALL_INTEREST_QUERY }]}
        >
          {(removeTargetUser, { loading }) => {
            if (loading) return <p />;
            return (
              <button
                type="button"
                onClick={e => {
                  this.mutate(removeTargetUser);
                }}
              >
                <input
                  alt="Wrong"
                  type="image"
                  src="../../../static/wrong.webp"
                  width="48"
                  height="48"
                />
              </button>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default RemoveButton;

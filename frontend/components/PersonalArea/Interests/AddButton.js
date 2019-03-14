import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { ALL_INTEREST_QUERY } from "./Interest";

const ADD_TAGS_USER = gql`
  mutation ADD_TAGS_USER($interestId: ID!) {
    addTargetUser(interestId: $interestId) {
      id
    }
  }
`;

export class AddButton extends Component {
  state = {
    interestId: this.props.interestId
  };

  static propTypes = {
    interestId: PropTypes.string.isRequired
  };

  mutate = async mutation => {
    const res = await mutation();
    if (res) {
      console.log("id", res.data.addTargetUser.id);
      this.props.changeTrue(res.data.addTargetUser.id);
    }
  };
  render() {
    return (
      <Mutation
        mutation={ADD_TAGS_USER}
        variables={this.state}
        refetchQueries={[{ query: ALL_INTEREST_QUERY }]}
      >
        {(addTargetUser, { loading }) => {
          if (loading) return <p />;
          return (
            <button
              onClick={e => {
                this.mutate(addTargetUser);
              }}
            >
              <input
                type="image"
                src="../../../static/right.png"
                alt="Submit"
                width="48"
                height="48"
              />
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default AddButton;

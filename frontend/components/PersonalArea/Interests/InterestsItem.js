import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import User from "../../Authentication/User";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

const Border = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius};
  img {
    border-radius: ${props => props.theme.borderRadius};
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  border: 2px solid #dddddd;
  input {
    float: right;
    padding-top: 2.5rem;
    padding-right: 2.5rem;
    outline: none;
  }
  input:focus {
    outline: none;
  }
  p {
    opacity: 0.8;
    float: left;
    font-size: 1.6rem;
    line-height: 4;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 1rem;
    margin: 0.5rem;
  }
  button {
    background: none;
    float: right;
  }
  button:hover {
    background: none !important;
  }
  button:focus {
    outline: none;
  }
`;

class InterestItem extends Component {
  state = {
    idToDelete: "",
    interestId: this.props.interest.id,
    isActive: false,
    userInterest: [this.props.userInterest]
  };

  static propTypes = {
    interest: PropTypes.object.isRequired
  };

  changeFalse = e => {
    this.setState({ isActive: false });
  };
  changeTrue = e => {
    this.setState({ idToDelete: e, isActive: true });
  };
  componentDidMount = () => {
    this.state.userInterest.forEach(item => {
      item.forEach(user => {
        var found = false;
        if (user.interest.id === this.state.interestId) {
          found = true;
          this.setState({ idToDelete: user.id });
        }
        if (found) {
          this.setState({ isActive: true });
        }
      });
    });
  };

  render() {
    const { interest } = this.props;

    return (
      <User>
        {({ data: { me } }) => (
          <Border>
            <form>
              <p> {interest.name}</p>
              {!this.state.isActive && (
                <AddButton
                  changeTrue={this.changeTrue}
                  interestId={this.state.interestId}
                />
              )}
              {this.state.isActive && (
                <RemoveButton
                  changeFalse={this.changeFalse}
                  interestId={this.state.idToDelete}
                />
              )}
            </form>

            <img src={interest.thumbnail} />
          </Border>
        )}
      </User>
    );
  }
}

export default InterestItem;

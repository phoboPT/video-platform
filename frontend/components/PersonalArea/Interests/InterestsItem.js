import React, { Component } from "react";
import PropTypes from "prop-types";
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
    float: left;
    font-size: 1.8rem;
    line-height: 4;
    font-weight: 500;
    flex-grow: 1;
    padding: 0 1rem;
    margin: 0.5rem;
  }
  button {
    background: none;
    float: right;
  }
  button:hover {
    background: none;
  }
  button:focus {
    outline: none;
  }
`;

class InterestItem extends Component {
  state = {
    interestId: this.props.interest.id,
    isActive: false,
    idToDelete: "",
    userInterest: [this.props.userInterest]
  };

  static propTypes = {
    interest: PropTypes.object.isRequired
  };

  changeFalse = e => {
    this.setState({ isActive: false });
  };
  changeTrue = e => {
    console.log("recebeu", e);
    this.setState({ isActive: true, idToDelete: e });
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

            <img src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg" />
          </Border>
        )}
      </User>
    );
  }
}

export default InterestItem;

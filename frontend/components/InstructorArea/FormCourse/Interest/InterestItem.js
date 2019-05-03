import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

const Border = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 20%;
  border-radius: ${props => props.theme.borderRadius};
  margin-block-end: 2rem;
  margin-right: 2rem;
  img {
    border-radius: ${props => props.theme.borderRadius};
    width: 100%;
    height: 210px;
    object-fit: cover;
  }
  border: 2px solid #dddddd;

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
    padding-top: 30px !important;
    background: none;
    float: right;
    border: none;
    cursor: pointer;
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
    courseId: this.props.courseId,
    interestId: this.props.interest.id,
    isActive: false,
    idToDelete: '',
    courseInterest: [this.props.courseInterest],
  };

  static propTypes = {
    courseId: PropTypes.string.isRequired,
    interest: PropTypes.object.isRequired,
  };

  changeFalse = e => {
    this.setState({
      isActive: false,
    });
  };

  changeTrue = e => {
    this.setState({
      idToDelete: e,
      isActive: true,
    });
  };

  componentDidMount = () => {
    this.state.courseInterest.forEach(item => {
      item.forEach(course => {
        let found = false;
        if (course.interest.id === this.state.interestId) {
          found = true;
          this.setState({
            idToDelete: course.id,
          });
        }
        if (found) {
          this.setState({
            isActive: true,
          });
        }
      });
    });
  };

  render() {
    const { interest } = this.props;
    const { idToDelete, isActive, interestId, courseId } = this.state;
    return (
      <Border>
        <form>
          <p> {interest.name} </p>
          {!isActive && (
            <AddButton
              changeTrue={this.changeTrue}
              interestId={interestId}
              courseId={courseId}
            />
          )}
          {isActive && (
            <RemoveButton
              changeFalse={this.changeFalse}
              interestId={idToDelete}
              courseId={courseId}
            />
          )}
          <img alt="thumbnail" src={interest.thumbnail} />
        </form>
      </Border>
    );
  }
}

export default InterestItem;

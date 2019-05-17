import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Index from './DragNDrop/Index';
import SaveCourseButton from './SaveCourseButton';

const Container = styled.div`
  width: 90%;
  margin-left: 2rem;
  h2 {
    padding-top: 2.5rem;
    padding-left: 1rem;
    margin: 0;
  }
  .button {
    float: right;
    .save {
      width: auto;
      background: red;
      color: white;
      border: 0;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
    }
  }
  #message {
    margin: 0;
    padding-top: 2.5rem;
    padding-left: 1.5rem;
    text-align: left;
  }
`;

class Media extends Component {
  state = {
    videosToDelete: [],
  };

  updateFilesToDelete = (stateToUpdate, id) => {
    const { videosToDelete } = this.state;

    switch (stateToUpdate) {
      case 'video': {
        const newState = [...videosToDelete];
        newState.push(id);
        this.setState({ videosToDelete: [...newState] });
        break;
      }

      default:
        break;
    }
  };

  render() {
    const { sections, updateState, courseId, undoSections } = this.props;
    return (
      <Container>
        <p id="message">
          In this area you can add content to your course and customize it to
          your liking
        </p>
        <div className="button">
          <SaveCourseButton
            sections={sections}
            id={courseId}
            data={this.state}
          />
        </div>
        <br />
        <p>Sections</p>
        <Index
          updateFilesToDelete={this.updateFilesToDelete}
          sections={sections}
          updateState={updateState}
          courseId={courseId}
          undoSections={undoSections}
        />
      </Container>
    );
  }
}

Media.propTypes = {
  sections: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  undoSections: PropTypes.func.isRequired,
};

export default Media;

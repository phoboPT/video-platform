import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Index from './DragNDrop/Index';
import SaveCourseButton from './SaveCourseButton';

const Container = styled.div`
  margin: 1rem;
  width: 100%;

  .button {
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
`;

class Media extends Component {
  render() {
    const { sections, updateState, courseId, children } = this.props;
    return (
      <Container>
        <h2>Create the Sections</h2>
        <div className="button">
          <SaveCourseButton sections={sections} id={courseId} />
        </div>
        <br />
        <p>Sections</p>
        <Index
          sections={sections}
          updateState={updateState}
          courseId={courseId}
        />
      </Container>
    );
  }
}

Media.propTypes = {
  sections: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Media;

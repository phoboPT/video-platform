import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Index from '../DragNDrop/Index';

const Container = styled.div`
  margin: 1rem;
  width: 100%;
`;

class Media extends Component {
  render() {
    const { sections, updateState, courseId } = this.props;

    return (
      <Container>
        <h2>Create the Sections</h2>

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
};

export default Media;

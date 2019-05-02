import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoColumn from './VideoColumn';

const Container = styled.div`
  margin: 15px 15px;
  border: 1px solid #d4d8da;
  border-radius: 2px;
  background-color: #d4d8da;
  h4 {
    margin: 1rem;
    background-color: #c2c6c8;
  }
  .left {
    float: left;
  }
  .rigth {
    background-color: #c2c6c8;
    text-align: right;
    padding: 1rem 2rem 1rem 0;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

class VideoSection extends Component {
  state = {
    section: JSON.parse(this.props.data.course.section),
    show: true,
    sectionHided: ['section-1'],
  };

  expand = (e, section) => {
    const { section: prevSection, sectionHided } = this.state;
    console.log('state', prevSection.sections[section].id, section);
    let findEqual = 0;
    sectionHided.forEach((item, index) => {
      if (item === prevSection.sections[section].id) {
        findEqual += 1;
      }
    });
    console.log('final', findEqual);
    if (findEqual < 1) {
      const newSection = [...sectionHided, section];
      this.setState({ sectionHided: newSection });
    }
  };

  render() {
    const { changeSelectedVideo, id } = this.props;
    const { columnOrder, sections, videos, files } = this.state.section;
    const { show, sectionHided } = this.state;
    return (
      <Container>
        {columnOrder.map((columnId, index) => {
          const section = sections[columnId];
          return (
            <Fragment key={index}>
              <div className="left">
                <h4>{section.title}</h4>
              </div>
              <div className="rigth">
                <button type="button" onClick={e => this.expand(e, section.id)}>
                  🔽
                </button>
              </div>

              <Fragment key={index}>
                <VideoColumn
                  id={id}
                  section={section}
                  key={section.id}
                  videos={videos}
                  sectionHided={sectionHided}
                  files={files}
                  changeSelectedVideo={changeSelectedVideo}
                />
              </Fragment>
            </Fragment>
          );
        })}
      </Container>
    );
  }
}

VideoSection.propTypes = {
  data: PropTypes.object.isRequired,
  changeSelectedVideo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default VideoSection;

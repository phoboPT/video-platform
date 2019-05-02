/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Video from './Video';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: #23a3de;
  padding: 1rem 0 0 3rem;

  input {
    margin: 10px 0px 5px 10px;
  }
`;

const VideoList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'ligthgrey' : 'inherit'};
  min-height: 100px;
  padding: 0 1rem 0 5rem;
`;

class InnerList extends React.PureComponent {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    updateSections: PropTypes.func.isRequired,
    handleVideo: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
    section: PropTypes.object.isRequired,
    updateFiles: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      videos,
      handleVideo,
      courseId,
      updateSections,
      section,
      updateFiles,
      title,
    } = this.props;

    return videos.map(
      (video, index) =>
        video && (
          <Video
            index={index}
            key={video.id}
            video={video}
            handleVideo={handleVideo}
            courseId={courseId}
            updateSections={updateSections}
            updateFiles={updateFiles}
            section={section}
            title={title}
          />
        )
    );
  }
}

class Column extends Component {
  constructor(props) {
    super(props);
    const { section } = props;

    this.state = { disabled: false, title: section.title };
  }

  changeState = async e => {
    const { handleChange, section } = this.props;
    const { title } = this.state;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    await this.setState({ [name]: val });
    handleChange(this.state.title, section.id);
  };

  disableInput = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  render() {
    const { disabled, title } = this.state;
    const {
      addVideo,
      handleVideo,
      section,
      videos,
      index,
      courseId,
      updateSections,
      updateFiles,
      isShow,
    } = this.props;
    return (
      <Draggable draggableId={section.id} index={index}>
        {provided => (
          <Container {...provided.draggableProps} innerRef={provided.innerRef}>
            <div {...provided.dragHandleProps}>
              <label htmlFor="Title">
                <input
                  disabled={disabled}
                  name="title"
                  onBlur={() => this.disableInput()}
                  onChange={this.changeState}
                  placeholder="Section"
                  required
                  type="text"
                  value={title}
                />
                {!isShow && (
                  <button onClick={this.disableInput} type="button">
                    ✏️
                  </button>
                )}
              </label>
            </div>
            <Droppable droppableId={section.id} type="video">
              {(provided, snapshot) => (
                <>
                  <VideoList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <button type="button" onClick={() => addVideo(section)}>
                      + Add Video
                    </button>
                    <InnerList
                      videos={videos}
                      handleVideo={handleVideo}
                      courseId={courseId}
                      updateSections={updateSections}
                      updateFiles={updateFiles}
                      section={section}
                      title={title}
                    />
                    {provided.placeholder}
                  </VideoList>
                </>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

Column.propTypes = {
  addVideo: PropTypes.func.isRequired,
  handleVideo: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  videos: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateSections: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  courseId: PropTypes.string.isRequired,
  updateFiles: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
};

export default Column;

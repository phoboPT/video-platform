import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Video from './Video';

const Container = styled.div`
  margin: auto;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 700px;

  input {
    margin: 10px 0px 5px 10px;
  }
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  min-height: 100px;
`;
class Column extends Component {
  constructor(props) {
    super(props);
    const { section } = props;

    this.state = { disabled: false, title: section.title };
  }

  changeState = e => {
    const { handleChange, section } = this.props;
    const { title } = this.state;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });

    handleChange(title, section.id);
  };

  disableInput = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  render() {
    const { disabled, title } = this.state;
    const { addVideo, handleVideo, section, videos, index } = this.props;
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
                <button onClick={this.disableInput} type="button">
                  ✏️
                </button>
              </label>
            </div>
            <Droppable droppableId={section.id} type="video">
              {(provided, snapshot) => (
                <>
                  <TaskList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <button type="button" onClick={() => addVideo(section)}>
                      + Add Video
                    </button>
                    {videos &&
                      videos.map((video, index) => (
                        <Video
                          index={index}
                          key={video.id}
                          video={video}
                          handleVideo={handleVideo}
                        />
                      ))}
                    {provided.placeholder}
                  </TaskList>
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
};

export default Column;

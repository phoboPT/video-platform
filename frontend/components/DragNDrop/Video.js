import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
class Video extends Component {
  state = this.props.video;

  changeState = e => {
    const { handleVideo, video } = this.props;
    const { content } = this.state;

    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });

    handleVideo(content, video.id);
  };

  disableInput = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  render() {
    const { video, index } = this.props;
    const { disabled, content } = this.state;
    return (
      <Draggable draggableId={video.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <label htmlFor="Title">
              <input
                disabled={disabled}
                name="content"
                onBlur={() => this.disableInput()}
                onChange={this.changeState}
                placeholder="Video"
                required
                type="text"
                value={content}
              />

              <button type="button" onClick={this.disableInput}>
                ✏️
              </button>
              <Handle />
            </label>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Video;

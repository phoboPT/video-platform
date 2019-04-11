import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
export class Video extends Component {
  state = this.props.video;

  changeState = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });

    this.props.handleVideo(this.state.content, this.props.video.id);
  };
  render() {
    return (
      <Draggable draggableId={this.props.video.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <label htmlFor="Title">
              <input
                disabled={this.state.disabled}
                name="title"
                onBlur={() => this.disableInput()}
                onChange={this.changeState}
                placeholder="Video"
                required
                type="text"
                value={this.state.content}
              />
              <button onClick={this.disableInput}>✏️</button>
            </label>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Video;

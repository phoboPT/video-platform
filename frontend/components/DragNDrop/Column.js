import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Video";

const Container = styled.div`
  margin: auto;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 700px;

  input {
    margin: 10px 0px 5px 10px;
  }
`;

const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  min-height: 100px;
`;
export class Column extends Component {
  state = { disabled: false, title: this.props.section.title };

  changeState = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });

    this.props.handleChange(this.state.title, this.props.section.id);
  };

  disableInput = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  render() {
    return (
      <Container>
        <label htmlFor="Title">
          <input
            disabled={this.state.disabled}
            name="title"
            onBlur={() => this.disableInput()}
            onChange={this.changeState}
            placeholder="Section"
            required
            type="text"
            value={this.state.title}
          />
          <button onClick={this.disableInput}>✏️</button>
        </label>

        <Droppable droppableId={this.props.section.id}>
          {(provided, snapshot) => (
            <>
              <TaskList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <button onClick={() => this.props.addVideo(this.props.section)}>
                  + Add Video
                </button>
                {this.props.videos &&
                  this.props.videos.map((video, index) => (
                    <>
                      {console.log("video", video)}
                      <Task
                        index={index}
                        key={video.id}
                        video={video}
                        handleVideo={this.props.handleVideo}
                      />
                    </>
                  ))}
                {provided.placeholder}
              </TaskList>
            </>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;

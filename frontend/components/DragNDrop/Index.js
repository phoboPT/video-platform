// import "@atlaskit/css-reset";
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Column from "./Column";
import initialData from "./initial-data";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
`;

class Index extends Component {
  state = initialData;

  onDragEnd = result => {
    //TODO reorder our column

    const { destination, draggableId, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <Container>
        <DragDropContext>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId],
            );

            return <Column column={column} key={column.id} tasks={tasks} />;
          })}
        </DragDropContext>
      </Container>
    );
  }
}

export default Index;

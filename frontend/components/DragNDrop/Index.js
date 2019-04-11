import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Column from "./Column";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  max-width: 720px;
  button {
    margin: 8px;
  }
`;

class Index extends Component {
  state = require("./initial-data.json");

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

    const start = this.state.sections[source.droppableId];
    const finish = this.state.sections[destination.droppableId];
    if (start === finish) {
      const newVideoIds = Array.from(start.videoIds);
      newVideoIds.splice(source.index, 1);
      newVideoIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        videoIds: newVideoIds,
      };

      const newState = {
        ...this.state,
        sections: {
          ...this.state.sections,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }
    const startVideosIds = Array.from(start.videoIds);
    startVideosIds.splice(source.index, 1);
    const newStart = {
      ...start,
      videoIds: startVideosIds,
    };

    const finishVideosIds = Array.from(finish.videoIds);
    finishVideosIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      videoIds: finishVideosIds,
    };

    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
        [newFinish.id]: newFinish,
        [newStart.id]: newStart,
      },
    };
    this.setState(newState);
  };

  handleChange = (title, sectionId) => {
    const section = this.state.sections[sectionId];
    //const lastSection = this.state.sections[`section-${lengthSection}`];
    section.title = title;

    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
      },
    };

    this.setState(newState);
  };

  handleVideo = (title, sectionId) => {
    const videos = this.state.videos[sectionId];
    //const lastSection = this.state.sections[`section-${lengthSection}`];
    videos.content = title;

    const newState = {
      ...this.state,
      videos: {
        ...this.state.videos,
      },
    };

    this.setState(newState);
  };

  addSection = e => {
    const size = Object.keys(this.state.sections).length + 1;

    const newColumn = {
      id: "section-" + size,
      title: "",
      videoIds: [],
    };
    // const column = { ...this.state.columnOrder };

    const newState = {
      ...this.state,
      columnOrder: [...this.state.columnOrder, `section-${size}`],
      sections: {
        ...this.state.sections,
        ["section-" + size]: newColumn,
      },
    };

    this.setState(newState);
  };

  addVideo = e => {
    const sizeVideos = Object.keys(this.state.videos).length + 1;
    const sizeSection = Object.keys(this.state.sections).length + 1;

    const newVideo = {
      content: "",
      id: "video-" + sizeVideos,
    };

    e.videoIds.push("video-" + sizeVideos);
    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
      },
      videos: {
        ...this.state.videos,
        ["video-" + sizeVideos]: newVideo,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <Container>
        <button onClick={this.addSection}>+ Add Section</button>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map(columnId => {
            const section = this.state.sections[columnId];
            let video;
            if (section.videoIds) {
              video = section.videoIds.map(videoId => {
                console.log("videoId", videoId);
                return this.state.videos[videoId];
              });
            }
            console.log(section);
            console.log("index", video);
            return (
              <Column
                addVideo={this.addVideo}
                handleChange={this.handleChange}
                handleVideo={this.handleVideo}
                key={section.id}
                section={section}
                videos={video}
              />
            );
          })}
        </DragDropContext>
      </Container>
    );
  }
}

export default Index;

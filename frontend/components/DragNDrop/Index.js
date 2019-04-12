import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

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
  state = { columnOrder: [], sections: {}, videos: {} };

  onDragEnd = result => {
    const { destination, draggableId, source, type } = result;
    const { sections, columnOrder } = this.state;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'section') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
    }

    const start = sections[source.droppableId];
    const finish = sections[destination.droppableId];
    if (start === finish) {
      const newVideoIds = Array.from(start.videoIds);
      newVideoIds.splice(source.index, 1);
      newVideoIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        videoIds: newVideoIds,
      };

      const changeState = {
        ...this.state,
        sections: {
          ...sections,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(changeState);
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
        ...sections,
        [newFinish.id]: newFinish,
        [newStart.id]: newStart,
      },
    };
    this.setState(newState);
  };

  handleChange = (title, sectionId) => {
    const { sections } = this.state;
    const section = sections[sectionId];
    section.title = title;

    const newState = {
      ...this.state,
      sections: {
        ...sections,
      },
    };

    this.setState(newState);
  };

  handleVideo = (title, sectionId) => {
    const { videos } = this.state;
    const video = videos[sectionId];
    video.content = title;
    const newState = {
      ...this.state,
      videos: {
        ...videos,
      },
    };

    this.setState(newState);
  };

  addSection = () => {
    const { sections, columnOrder } = this.state;
    const size = Object.keys(sections).length + 1;

    const newColumn = {
      id: `section-${size}`,
      title: '',
      videoIds: [],
    };

    const newState = {
      ...this.state,
      columnOrder: [...columnOrder, `section-${size}`],
      sections: {
        ...sections,
        [`section-${size}`]: newColumn,
      },
    };

    this.setState(newState);
  };

  addVideo = e => {
    const { videos, sections } = this.state;
    const sizeVideos = Object.keys(videos).length + 1;

    const newVideo = {
      content: '',
      id: `video-${sizeVideos}`,
    };

    e.videoIds.push(`video-${sizeVideos}`);
    const newState = {
      ...this.state,
      sections: {
        ...sections,
      },
      videos: {
        ...videos,
        [`video-${sizeVideos}`]: newVideo,
      },
    };

    this.setState(newState);
  };

  render() {
    const { columnOrder, sections, videos } = this.state;
    return (
      <>
        <button type="button" onClick={this.addSection}>
          + Add Section
        </button>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="vertical"
            type="section"
          >
            {provided => (
              <Container
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {columnOrder.map((columnId, index) => {
                  const section = sections[columnId];
                  let video;
                  if (section.videoIds) {
                    video = section.videoIds.map(videoId => videos[videoId]);
                  }
                  return (
                    <div key={section.id}>
                      <Column
                        addVideo={this.addVideo}
                        handleChange={this.handleChange}
                        handleVideo={this.handleVideo}
                        key={section.id}
                        section={section}
                        videos={video}
                        index={index}
                      />

                      {provided.placeholder}
                    </div>
                  );
                })}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

export default Index;

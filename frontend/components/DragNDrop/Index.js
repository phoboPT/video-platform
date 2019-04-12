import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Column from './Column';

const Container = styled.div`
  margin: 15px 15px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  max-width: 720px;
  background-color: grey;
  button {
    margin: 8px;
  }
`;

class InnerList extends React.Component {
  static propTypes = {
    column: PropTypes.array,
    videosMap: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    section: PropTypes.object.isRequired,
    addVideo: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleVideo: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { column, videosMap, index } = this.props;

    if (
      nextProps.column === column &&
      nextProps.videosMap === videosMap &&
      nextProps.index === index
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      section,
      videosMap,
      index,
      addVideo,
      handleChange,
      handleVideo,
    } = this.props;
    let videos;
    if (section.videoIds) {
      videos = section.videoIds.map(videoId => videosMap[videoId]);
    }
    return (
      <Column
        addVideo={addVideo}
        handleChange={handleChange}
        handleVideo={handleVideo}
        key={section.id}
        section={section}
        videos={videos}
        index={index}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
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
      this.setState(newState);
      return;
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

                  return (
                    <InnerList
                      addVideo={this.addVideo}
                      handleChange={this.handleChange}
                      handleVideo={this.handleVideo}
                      key={section.id}
                      section={section}
                      videosMap={videos}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

Index.propTypes = {
  index: PropTypes.number,
  videosMap: PropTypes.object,
  addVideo: PropTypes.func,
  handleChange: PropTypes.func,
  handleVideo: PropTypes.func,
  section: PropTypes.object,
};

export default Index;

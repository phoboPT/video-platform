import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Column from './Column';

const Container = styled.div`
  display: grid;
  button {
    font-size: 1.5rem;
  }
  .add-section {
    margin: 8px;
    width: auto;
    background: #4dcb5d;
    color: white;
    border: 0;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  .head {
    order: 1;
    flex: 1;
  }
  .section {
    order: 2;
    margin: 15px 15px;
    border-radius: 2px;
    background-color: lightgrey;
  }
`;

class InnerList extends React.PureComponent {
  static propTypes = {
    videosMap: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    section: PropTypes.object.isRequired,
    addVideo: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleVideo: PropTypes.func.isRequired,
    updateSections: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
    updateFiles: PropTypes.func.isRequired,
    isShow: PropTypes.bool,
    removeSection: PropTypes.func.isRequired,
    removeVideo: PropTypes.func.isRequired,
  };

  render() {
    const {
      section,
      videosMap,
      index,
      addVideo,
      handleChange,
      handleVideo,
      courseId,
      updateSections,
      updateFiles,
      isShow,
      removeSection,
      removeVideo,
    } = this.props;
    let videos;
    if (section.videoIds) {
      videos = section.videoIds.map(videoId => videosMap[videoId]);
    }
    return (
      <Column
        removeSection={removeSection}
        addVideo={addVideo}
        handleChange={handleChange}
        handleVideo={handleVideo}
        key={section.id}
        section={section}
        videos={videos}
        index={index}
        isShow={isShow}
        courseId={courseId}
        updateSections={updateSections}
        updateFiles={updateFiles}
        removeVideo={removeVideo}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class Index extends Component {
  state = {};

  componentDidMount() {
    const { sections } = this.props;
    this.setState(sections);
  }

  onDragEnd = async result => {
    const { destination, draggableId, source, type } = result;
    const { sections, columnOrder } = this.state;
    const { updateState } = this.props;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Section
    if (type === 'section') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      await this.setState(newState);
      updateState(this.state);
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

      const newState = {
        ...this.state,
        sections: {
          ...sections,
          [newColumn.id]: newColumn,
        },
      };

      await this.setState(newState);
      updateState(this.state);
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

    // console.log('new state', newState.videos);
    await this.setState(newState);
    updateState(this.state);
  };

  handleChange = async (title, sectionId) => {
    const { sections } = this.state;
    const { updateState } = this.props;

    const section = sections[sectionId];
    section.title = title;

    const newState = {
      ...this.state,
      sections: {
        ...sections,
      },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  handleVideo = async (title, sectionId) => {
    const { videos } = this.state;
    const video = videos[sectionId];
    const { updateState } = this.props;

    video.content = title;
    const newState = {
      ...this.state,
      videos: {
        ...videos,
      },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  updateSections = async (video, id, section) => {
    const { videos } = this.state;
    const atualvideo = videos[video.id];
    const { updateState } = this.props;

    delete Object.assign(videos, { [id]: videos[video.id] })[video.id];
    let index = 0;
    section.videoIds.forEach((item, i) => {
      if (item === video.id) {
        index = i;
      }
    });
    section.videoIds[index] = id;
    if (id) {
      atualvideo.id = id;
    }
    const newState = {
      ...this.state,
      videos: {
        ...videos,
      },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  updateFiles = async (id, newFile) => {
    const { updateState } = this.props;

    const newState = {
      ...this.state,
      files: {
        ...newFile,
      },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  addSection = async () => {
    const { sections, columnOrder } = this.state;
    const size = Object.keys(sections).length + 1;
    const { updateState } = this.props;
    const newColumn = {
      id: `section-${size}`,
      title: '',
      videoIds: [],
      fileIds: [],
    };

    const newState = {
      ...this.state,
      columnOrder: [...columnOrder, `section-${size}`],
      sections: {
        ...sections,
        [`section-${size}`]: newColumn,
      },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  addVideo = async e => {
    const { videos, sections } = this.state;
    const sizeVideos = Object.keys(videos).length + 1;
    const { updateState } = this.props;
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

    await this.setState(newState);
    updateState(this.state);
  };

  removeSection = async sectionId => {
    const { sections, videos, files, columnOrder } = this.state;
    const { updateState } = this.props;

    const videosIds = sections[sectionId].videoIds;
    const { fileIds } = sections[sectionId].fileIds;

    if (fileIds) {
      fileIds.forEach(element => {
        delete files[element];
      });
    }
    if (videosIds) {
      videosIds.forEach(element => {
        delete videos[element];
      });
    }
    if (columnOrder) {
      columnOrder.forEach((element, index) => {
        if (element === sectionId) {
          columnOrder.splice(index, 1);
        }
      });
    }
    delete sections[sectionId];

    const newState = {
      columnOrder: [...columnOrder],
      sections: {
        ...sections,
      },
      videos: { ...videos },
      files: { ...files },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  removeVideo = async videoId => {
    const { videos } = this.state;
    const { updateState } = this.props;

    delete videos[videoId];

    const newState = {
      ...this.state,
      videos: { ...videos },
    };

    await this.setState(newState);
    updateState(this.state);
  };

  render() {
    const { columnOrder, sections, videos, key } = this.state;
    const { courseId, isShow, undoSections } = this.props;

    return (
      <Container key={key}>
        <div className="head">
          {!isShow && (
            <>
              <button
                type="button"
                className="add-section"
                onClick={this.addSection}
              >
                ➕ Add Section
              </button>

              <button
                type="button"
                className="add-section"
                onClick={undoSections}
              >
                🔙 Undo
              </button>
            </>
          )}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="vertical"
            type="section"
          >
            {provided => (
              <div
                className="section"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder &&
                  columnOrder.map((columnId, index) => {
                    const section = sections[columnId];
                    return (
                      <InnerList
                        addVideo={this.addVideo}
                        removeSection={this.removeSection}
                        handleChange={this.handleChange}
                        handleVideo={this.handleVideo}
                        updateSections={this.updateSections}
                        updateFiles={this.updateFiles}
                        key={section.id}
                        isShow={isShow}
                        section={section}
                        videosMap={videos}
                        index={index}
                        courseId={courseId}
                        removeVideo={this.removeVideo}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    );
  }
}

Index.propTypes = {
  sections: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  isShow: PropTypes.bool,
  undoSections: PropTypes.func.isRequired,
};

export default Index;

/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Video from './Video';

const Container = styled.div`
  margin: 2rem auto 3rem auto;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? '#c9d2d6' : '#e3eced')};
  border: 1.5px solid #cbd9db;
  button:focus {
    outline: none;
  }
  .add-Video {
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 90px;
      height: 55px;
    }
  }
  .head {
    display: flex;
    .first {
      order: 1;
      flex: 2;
      margin: auto;
      text-align: left;
      input {
      }
    }
    .second {
      margin: 1rem 2rem 1rem 0;
      order: 2;
      display: flex;

      .remove {
        img {
          width: 5rem;
          height: 5rem;
        }
        background: none;
        cursor: pointer;
        float: right;
        width: 7rem;
        height: 5rem;
        border: 0;
        font-weight: 600;
        margin: auto;
      }
    }
  }
  input {
    margin: 10px 0px 5px 10px;
  }
`;

const VideoList = styled.div`
  padding: 8px;

  min-height: 100px;
  padding: 1rem 5rem 1rem 5rem;
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
    removeVideo: PropTypes.func.isRequired,
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
      removeVideo,
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
            removeVideo={removeVideo}
          />
        )
    );
  }
}

class Column extends Component {
  constructor(props) {
    super(props);
    const { section } = props;

    this.state = { title: section.title };
  }

  changeState = async e => {
    const { title } = this.state;
    const { handleChange, section } = this.props;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    await this.setState({ [name]: val });
    handleChange(title, section.id);
  };

  disableInput = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  handleRemove = e => {
    const { removeSection } = this.props;

    removeSection(e.target.id);
  };

  render() {
    const { title } = this.state;
    const {
      addVideo,
      handleVideo,
      section,
      videos,
      index,
      courseId,
      updateSections,
      updateFiles,
      removeSection,
      removeVideo,
    } = this.props;
    return (
      <Draggable draggableId={section.id} index={index}>
        {(provided, snapshot) => (
          <>
            <Container
              {...provided.draggableProps}
              innerRef={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <div {...provided.dragHandleProps} className="head">
                <div className="first">
                  <label htmlFor="Title">
                    <input
                      name="title"
                      onChange={this.changeState}
                      placeholder="Section"
                      required
                      type="text"
                      value={title}
                    />
                  </label>
                </div>
                <div className="second">
                  <button
                    className="remove"
                    type="button"
                    onClick={this.handleRemove}
                    id={section.id}
                  >
                    <img
                      alt="remove"
                      src="../../../../static/deleteIcon.webp"
                    />
                  </button>
                </div>
              </div>
              <Droppable droppableId={section.id} type="video">
                {(provided, snapshot) => (
                  <>
                    <VideoList
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      <InnerList
                        removeVideo={removeVideo}
                        removeSection={removeSection}
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
                    <button
                      type="button"
                      className="add-Video"
                      onClick={() => addVideo(section)}
                    >
                      <img
                        alt="add-Video"
                        src="../../../../static/addVideo.svg"
                      />
                    </button>
                  </>
                )}
              </Droppable>
            </Container>
          </>
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
  isShow: PropTypes.bool,
  removeSection: PropTypes.func.isRequired,
  removeVideo: PropTypes.func.isRequired,
};

export default Column;

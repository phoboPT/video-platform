/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Video from './Video';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 700px;
  background-color: white;

  input {
    margin: 10px 0px 5px 10px;
  }
`;

const VideoList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'ligthgrey' : 'inherit'};
  min-height: 100px;
`;

class InnerList extends React.PureComponent {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    handleVideo: PropTypes.func.isRequired,
  };

  render() {
    const { videos, handleVideo } = this.props;

    return videos.map((video, index) => (
      <Video
        index={index}
        key={video.id}
        video={video}
        handleVideo={handleVideo}
      />
    ));
  }
}

class Column extends Component {
  constructor(props) {
    super(props);
    const { section } = props;

    this.state = { disabled: false, title: section.title };
  }

  changeState = async e => {
    const { handleChange, section } = this.props;
    const { title } = this.state;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    await this.setState({ [name]: val });

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
                  <VideoList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <button type="button" onClick={() => addVideo(section)}>
                      + Add Video
                    </button>
                    <InnerList videos={videos} handleVideo={handleVideo} />
                    {provided.placeholder}
                  </VideoList>
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
  index: PropTypes.number.isRequired,
};

export default Column;

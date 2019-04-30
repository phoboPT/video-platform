import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateVideo from '../../UploadVideo/CreateVideo';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : ' #5AC4F5')};
  .video {
    float: right;
    padding-right: 5rem;
    background: none;
    border: none;
    margin: auto;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    img {
      height: 36px;
      width: 36px;
    }
  }
  .upload {
    text-align: right;
    padding-right: 2rem;
    button {
      background: none;
      border: none;
      &:focus {
        outline: none;
      }
      img {
        height: 36px;
        width: 36px;
      }
    }
  }
`;

class Video extends Component {
  state = {
    ...this.props.video,
    disabled: true,
    upload: 0,
  };

  changeState = async e => {
    const { handleVideo, video } = this.props;
    const { value } = e.target;

    await this.setState({ content: value });
    handleVideo(value, video.id);
  };

  disableInput = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  changeUpload = e => {
    const { upload } = this.state;
    if (upload === 1 && parseInt(e.currentTarget.id) === 1) {
      return this.setState({ upload: 0 });
    }
    this.setState({ upload: parseInt(e.currentTarget.id) });
  };

  render() {
    const {
      video,
      index,
      courseId,
      updateSections,
      section,
      updateFiles,
    } = this.props;
    const { disabled, content, upload } = this.state;
    return (
      <Draggable draggableId={video.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <label htmlFor="Content">
              <input
                disabled={disabled}
                name="content"
                onBlur={this.disableInput}
                onChange={this.changeState}
                placeholder="Video"
                required
                type="text"
                value={content}
              />

              <button type="button" onClick={this.disableInput}>
                ✏️
              </button>
              <button
                type="button"
                className="video"
                id="1"
                onClick={this.changeUpload}
              >
                <img src="../../static/upload.png" alt="Upload" />
              </button>
              <br />
              {upload !== 0 && (
                <div className="upload">
                  <button type="button" id="2" onClick={this.changeUpload}>
                    <img src="../../static/videoUpload.png" alt="Video" />
                  </button>

                  <button type="button" id="3" onClick={this.changeUpload}>
                    <img src="../../static/fileIcon.png" alt="File" />
                  </button>

                  {upload === 2 && (
                    <CreateVideo
                      header="Video"
                      show={1}
                      video={video}
                      courseId={courseId}
                      updateSections={updateSections}
                      updateFiles={updateFiles}
                      isUpdate={video.id.length > 20}
                      section={section}
                    />
                  )}
                  {upload === 3 && (
                    <CreateVideo
                      header="File"
                      show={2}
                      video={video}
                      courseId={courseId}
                      updateFiles={updateFiles}
                      updateSections={updateSections}
                      isUpdate={video.id.length > 20}
                      section={section}
                    />
                  )}
                </div>
              )}
            </label>
          </Container>
        )}
      </Draggable>
    );
  }
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  updateSections: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  updateFiles: PropTypes.func.isRequired,
  handleVideo: PropTypes.func.isRequired,
};

export default Video;

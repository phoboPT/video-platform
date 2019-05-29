import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateVideo from '../../UploadVideo/CreateVideo';

const Container = styled.div`
  display: grid;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  border: 2.5px solid #d1d1d1;
  background-color: ${props => (props.isDragging ? 'lightgreen' : ' #fcf9f9')};
  .video {
    display: flex;
    order: 1;
    background: none;
    .first {
      order: 1;
      flex: 5;
      display: flex;
      #text-box {
        flex: 1;
        order: 1;
      }
      #check-box {
        flex: 1;
        order: 2;
      }

      input[type='text'] {
        width: 90%;
      }
    }
    .second {
      order: 2;
      flex: 1;
      padding: auto;
      margin: auto;
      cursor: pointer;
      &:focus {
        outline: none;
      }
      .remove {
        text-align: center;
        width: 10rem;
        height: 3.5rem;
        background: red;
        color: white;
        border: 0;
        font-weight: 600;
        margin: auto;
        padding: none !important;
      }
      .new-file {
        background: none;

        padding: 0 3rem 0 0;
        float: right;
        border: none;
      }
      img {
        background: none;
        height: 36px;
        width: 36px;
      }
    }
  }
  .upload {
    display: flex;
    order: 2;
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
    .first {
      text-align: right;
      order: 1;
      flex: 1;
    }
    .second {
      text-align: left;
      order: 2;
      flex: 1;
    }
  }
  .file-upload {
    order: 3;
    display: flex;
    .first {
      order: 1;
      flex: 1;
    }
    .second {
      order: 2;
      flex: 1;
    }
    .third {
      order: 3;
      flex: 1;
    }
  }
`;

class Video extends Component {
  state = {
    ...this.props.video,
    upload: 0,
  };

  changeState = async e => {
    const { content, freeToWatch } = this.state;
    const { handleVideo, video } = this.props;
    const { value, id, checked } = e.target;
    console.log('checked', id, checked);

    await this.setState({ [id]: id === 'content' ? value : checked });
    const data = {
      content,
      freeToWatch,
    };
    console.log('data', data);
    handleVideo(data, video.id);
  };

  changeFree = () => {
    const { freeToWatch } = this.state;

    this.setState({ freeToWatch: !freeToWatch });
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

  handleRemove = e => {
    const { removeVideo } = this.props;

    removeVideo(e.target.id);
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
    const { content, upload } = this.state;
    return (
      <Draggable draggableId={video.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="video">
              <div className="first">
                <div id="text-box">
                  <input
                    id="content"
                    name="content"
                    onChange={this.changeState}
                    placeholder="Video"
                    required
                    type="text"
                    value={content}
                  />
                </div>
                <div id="check-box">
                  Free
                  <input
                    id="freeToWatch"
                    name="freeToWatch"
                    onChange={this.changeState}
                    placeholder="free"
                    required
                    type="checkbox"
                    checked={video.freeToWatch}
                  />
                </div>
              </div>
              <div className="second">
                <button
                  type="button"
                  className="new-file"
                  id="1"
                  onClick={this.changeUpload}
                >
                  <img src="../../static/upload.png" alt="Upload" />
                </button>

                <button
                  type="button"
                  id={video.id}
                  className="remove"
                  onClick={this.handleRemove}
                >
                  ➖ Remove
                </button>
              </div>
            </div>
            <br />
            {upload !== 0 && (
              <>
                <div className="upload">
                  <div className="first">
                    <button type="button" id="2" onClick={this.changeUpload}>
                      <img src="../../static/videoUpload.png" alt="Video" />
                    </button>
                  </div>
                  <div className="second">
                    <button type="button" id="3" onClick={this.changeUpload}>
                      <img src="../../static/fileIcon.png" alt="File" />
                    </button>
                  </div>
                </div>
                <div className="file-upload">
                  <div className="first" />
                  <div className="second">
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
                  <div className="third" />
                </div>
              </>
            )}
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
  removeVideo: PropTypes.func.isRequired,
};

export default Video;

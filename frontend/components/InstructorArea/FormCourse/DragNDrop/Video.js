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
  border: 1.5px solid #d1d1d1;
  background-color: ${props => (props.isDragging ? '#f7f7f7' : ' #ffffff')};
  .video {
    display: flex;
    order: 1;
    background: none;
    .first {
      order: 1;
      flex: 5;
      display: flex;
      #text-box {
        width: 40%;
        order: 1;
        input {
          width: 80%;
        }
      }
      #check-box {
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
      display: flex;
      &:focus {
        outline: none;
      }

      .remove {
        margin-right: 1rem;
        top: 0;
        order: 2;
        cursor: pointer;
        text-align: center;
        background: none;
        border: 0;
      }
      .remove:focus {
        outline: none;
      }
      .new-file {
        flex: 1;
        order: 1;
        background: none;
        padding: 0 3rem 0 0;
        border: none;
      }
      img {
        background: none;
        height: 36px;
        width: 36px;
      }
    }
    .tooltip {
      list-style: none;
      position: relative;
    }
    .tooltip:before,
    .tooltip:after {
      display: block;
      opacity: 0;
      pointer-events: none;
      position: absolute;
    }
    .tooltip:after {
      border-right: 6px solid transparent;
      border-bottom: 14px solid rgba(0, 0, 0, 0.75);
      border-left: 6px solid transparent;
      content: '';
      height: 0;
      top: 20px;
      left: 20px;
      width: 0;
    }
    .tooltip:before {
      background: rgba(0, 0, 0, 0.75);
      border-radius: 2px;
      color: #fff;
      content: attr(data-title);
      font-size: 14px;
      padding: 6px 10px;
      top: 26px;
      white-space: nowrap;
    }

    /* the animations */
    /* fade */
    .tooltip.fade:after,
    .tooltip.fade:before {
      transform: translate3d(0, -10px, 0);
      transition: all 0.15s ease-in-out;
    }
    .tooltip.fade:hover:after,
    .tooltip.fade:hover:before {
      opacity: 1;
      transform: translate3d(0, 0, 0);
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
    const { handleVideo, video } = this.props;
    const { value, id, checked } = e.target;
    await this.setState({ [id]: id === 'content' ? value : checked });
    const { content, freeToWatch } = this.state;

    const data = {
      content,
      freeToWatch,
    };

    handleVideo(data, video.id);
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
    const { removeVideo, section } = this.props;

    removeVideo(e.target.id, section);
  };

  render() {
    const {
      video,
      index,
      courseId,
      updateSections,
      section,
      updateFiles,
      changeIsUploading,
    } = this.props;
    const { content, freeToWatch, upload } = this.state;
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
                  <li
                    className="tooltip fade"
                    data-title="Select If the Video is Free to Watch"
                  >
                    Free
                    <input
                      id="freeToWatch"
                      name="freeToWatch"
                      onChange={this.changeState}
                      placeholder="free"
                      required
                      type="checkbox"
                      checked={freeToWatch}
                    />
                  </li>
                </div>
              </div>
              <div className="second">
                <button
                  type="button"
                  className="new-file"
                  id="1"
                  onClick={this.changeUpload}
                >
                  <img src="../../static/upload.webp" alt="Upload" />
                </button>

                <button
                  type="button"
                  id={video.id}
                  className="remove"
                  onClick={this.handleRemove}
                >
                  ➖
                </button>
              </div>
            </div>
            <br />
            {upload !== 0 && (
              <>
                <div className="upload">
                  <div className="first">
                    <button type="button" id="2" onClick={this.changeUpload}>
                      <img src="../../static/videoUpload.webp" alt="Video" />
                    </button>
                  </div>
                  <div className="second">
                    <button type="button" id="3" onClick={this.changeUpload}>
                      <img src="../../static/fileIcon.webp" alt="File" />
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
                        changeIsUploading={changeIsUploading}
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
                        changeIsUploading={changeIsUploading}
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
  changeIsUploading: PropTypes.func.isRequired,
};

export default Video;

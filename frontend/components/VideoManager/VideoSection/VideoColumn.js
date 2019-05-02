/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 1.5rem;
  border: 1px solid #1f8fc2;
  border-radius: 2px;
  background-color: #1f8fc2;

  .rigth {
    margin: 1rem;
    text-align: right;
    padding: 1rem 2rem 1rem 0;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  .selected {
  }
`;

class InnerList extends React.PureComponent {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
  };

  state = { selected: this.props.item === this.props.id };

  render() {
    const { item, file, changeSelectedVideo } = this.props;
    const { selected } = this.state;
    return (
      <div className="right">
        <input
          type="checkbox"
          defaultChecked={selected}
          onChange={this.handleChangeChk}
        />
        <button type="button" onClick={() => changeSelectedVideo(item)}>
          {item}
        </button>
        <p>{file}</p>
      </div>
    );
  }
}

class VideoColumn extends Component {
  state = this.props;

  render() {
    const {
      section,
      videos,
      files,
      changeSelectedVideo,
      id,
      selected,
    } = this.state;
    const { sectionHided } = this.props;
    return (
      <Container>
        {section.videoIds.map(item => {
          const video = videos[item];
          const file = files[item];
          console.log('section', sectionHided, section.id);
          if (sectionHided === section.id) {
            return (
              <InnerList
                key={item}
                selected={selected}
                changeSelectedVideo={changeSelectedVideo}
                video={video}
                file={file}
                item={item}
                id={id}
              />
            );
          }
          return null;
        })}
      </Container>
    );
  }
}

VideoColumn.propTypes = {
  id: PropTypes.string.isRequired,
  sectionHided: PropTypes.string.isRequired,
};

export default VideoColumn;

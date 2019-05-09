/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoColumn from './VideoColumn';

const Container = styled.div`
  margin: 15px 15px;
  border-radius: 2px;
  max-height: 430px;
  max-width: 560px;
  h4 {
    margin: 1rem;
  }
  .left {
    text-align: left;
    flex: 9;
    order: 1;
    background-color: rgba(239, 239, 239, 0.8);
  }
  .rigth {
    order: 2;
    flex: 1;
    width: 100%;
    background-color: rgba(239, 239, 239, 0.8);
    text-align: right;
    padding: 1rem 2rem 1rem 0;
  }
  button {
    display: flex;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

class VideoElement extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number,
    section: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,

    files: PropTypes.object.isRequired,
    localStorageId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  state = { selected: this.props.item === this.props.id };

  componentDidMount() {
    const { localStorageId } = this.props;
    const value = JSON.parse(localStorage.getItem(localStorageId));
    this.setState({ show: value });
  }

  expand = () => {
    const { localStorageId } = this.props;
    const { show } = this.state;
    this.setState({ show: !show });
    localStorage.setItem(localStorageId, !show);
  };

  saveStateToLocalStorage = () => {
    // for every item in React state
    const { localStorageId } = this.props;
    const { show } = this.state;
    localStorage.setItem(localStorageId, show);
  };

  render() {
    const {
      index,
      section,
      videos,

      files,
      data,
    } = this.props;
    const { show } = this.state;
    console.log('sectionss');
    return (
      <Fragment key={index}>
        <button type="button" onClick={e => this.expand(e, section.id)}>
          <div className="left">
            <h4>{section.title}</h4>
          </div>
          <div className="left">
            <h4> {section.videoIds.length} aulas </h4>
          </div>

          <div className="rigth"> &#8675;</div>
        </button>

        <Fragment key={index}>
          <VideoColumn
            data={data}
            id={section.id}
            section={section}
            key={section.id}
            videos={videos}
            files={files}
            show={show}
          />
        </Fragment>
      </Fragment>
    );
  }
}

class VideoSection extends Component {
  state = {
    section: JSON.parse(this.props.data.course.section),
  };

  render() {
    const { data, id } = this.props;
    const { columnOrder, sections, videos, files } = this.state.section;
    return (
      <Container>
        {columnOrder.map((columnId, index) => {
          const section = sections[columnId];
          return (
            <VideoElement
              section={section}
              key={section.id}
              localStorageId={section.id}
              videos={videos}
              files={files}
              data={data}
              expand={this.expand}
            />
          );
        })}
      </Container>
    );
  }
}

VideoSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VideoSection;

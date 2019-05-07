import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import ItemStyles from '../../styles/ItemStyles';
import formatDate from '../../../lib/formatDate';
import DeleteVideo from './DeleteVideo';

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  'word-wrap': 'wrap',
}));

const Div = styled.div`
  max-width: 300px;
  display: grid;

  span {
    padding: 0 1rem;
    flex: 1;
    flex-wrap: wrap;
    grid-template-columns: 0.5fr 1fr;
    line-height: 1.5;
    padding-top: 0.5rem;
    margin-left: 0.5rem;
    text-align: left;
  }
`;

class Video extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
  };

  render() {
    const { video } = this.props;

    return (
      <ItemStyles>
        <Link
          href={{
            pathname: '/video',
            query: { id: video.id },
          }}
        >
          <img
            alt={video.title}
            src="https://media.wired.com/photos/5b74a1ca8a992b7a26e92da5/master/w_582,c_limit/comeout_videos-01.jpg"
          />
        </Link>

        <br />
        <br />
        <Div>
          <span>{video.title}</span>
          <span>
            <State
              background={video.state === 'Published' ? 'green' : 'red'}
              color="white"
            >
              {video.state}
            </State>
          </span>
          <span>{formatDate(video.createdAt)}</span>
        </Div>
        <div className="buttonList">
          <Link href={{ pathname: 'updateVideo', query: { id: video.id } }}>
            <a>Edit </a>
          </Link>

          <DeleteVideo id={video.id}> Delete</DeleteVideo>
        </div>
      </ItemStyles>
    );
  }
}

export default Video;

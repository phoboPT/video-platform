import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import ItemStyles from '../../styles/ItemStyles';
import Title from '../../styles/Title';

// Adapting based on props
const State = styled.strong(props => ({
  background: props.background,
  color: props.color,
  padding: '0 1rem',
}));

const Div = styled.div`
  span {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    line-height: 1.5;
    padding: 0.3rem 1rem;
  }
`;

class Video extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    data: PropTypes.number.isRequired,
  };

  render() {
    const { video } = this.props;
    return (
      <ItemStyles>
        <Title>
          <Link
            href={{
              pathname: '/video',
              query: { id: video.id },
            }}
          >
            <a>{video.title}</a>
          </Link>
        </Title>

        <Div>
          <span>Description: {video.description}</span>
          <span>
            State:
            <State
              background={video.state === 'Published' ? 'green' : 'red'}
              color="white"
            >
              {video.state}
            </State>
          </span>
          <span>
            User: <State>{video.user.name}</State>
          </span>
          <span>
            Category: <State>{video.category.name}</State>
          </span>
        </Div>
      </ItemStyles>
    );
  }
}

export default Video;

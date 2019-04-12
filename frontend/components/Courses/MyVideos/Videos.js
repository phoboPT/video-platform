import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import VideoItem from './VideoItem';
import { perPage } from '../../../config';
import Pagination from './Pagination';
import Search from './SearchVideosUser';
import ItemList from '../../styles/ItemList';

const ALL_VIDEOS_USER = gql`
  query ALL_VIDEOS_USER ($skip: Int =0,$first:Int=${perPage}){
      videosUser(first:$first,skip:$skip,orderBy:createdAt_DESC)  {
      id
      title
      description
      state
      urlVideo
      createdAt
     
    }
  }
`;

class Videos extends Component {
  render() {
    return (
      <>
        <br />
        <Query
          query={ALL_VIDEOS_USER}
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <>
                <Search />
                <ItemList>
                  {data.videosUser.map(video => (
                    <VideoItem video={video} key={video.id} />
                  ))}
                </ItemList>
              </>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </>
    );
  }
}

export default Videos;
export { ALL_VIDEOS_USER };

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import VideoItem from './VideoItem';
import { perPage } from '../../../config';
import Pagination from './Pagination';
import Search from './SearchVideosUser';
import ItemList from '../../styles/ItemList';
import Loading from '../../Static/Loading';
import Error from '../../Static/ErrorMessage.js';

const ALL_VIDEOS_USER = gql`
  query ALL_VIDEOS_USER ($skip: Int =0,$first:Int=${perPage}){
      videosFromUser(first:$first,skip:$skip,orderBy:createdAt_DESC)  {
      id
      title
      urlVideo
      createdAt
    }
  }
`;

class Videos extends Component {
  render() {
    const { page } = this.props;
    return (
      <>
        <br />
        <Query
          query={ALL_VIDEOS_USER}
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;

            if (error) return <Error error={error.message} />;

            if (!data) return <p>No Data</p>;
            if (data)
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
        <Pagination page={page} />
      </>
    );
  }
}

Videos.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Videos;
export { ALL_VIDEOS_USER };

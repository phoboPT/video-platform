import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import styled from "styled-components";
import { perPage } from "../config";
import Pagination from "./Pagination";
import Search from "./SearchVideosUser";

const ALL_VIDEOS_USER = gql`
  query ALL_VIDEOS_USER ($skip: Int =0,$first:Int=${perPage}){ 
      videosUser(first:$first,skip:$skip,orderBy:createdAt_DESC)  {
      id
      title
      description
      state
      category {
        name
      }
      user {
        name
      }
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;
const ItemList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  z-index: 1;
  max-width: ${props => props.theme.maxWidth};
  margin: 5rem;
  font-size: 1.5rem;
  img {
    width: 250px;
    height: 150px;
    align-self: center;
  }
  a {
    font-size: 3rem;
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
            skip: this.props.page * perPage - perPage
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
                    <Video video={video} key={video.id} />
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

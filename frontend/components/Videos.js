import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import styled from "styled-components";

const ALL_VIDEOS_USER = gql`
  query ALL_VIDEOS_USER {
    videosUser {
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  max-width: ${props => props.theme.maxWidth};
  margin: 3rem;
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
        <Query query={ALL_VIDEOS_USER}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <ItemList>
                {data.videosUser.map(video => (
                  <Video video={video} key={video.id} />
                ))}
              </ItemList>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Videos;
export { ALL_VIDEOS_USER };

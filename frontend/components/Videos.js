import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import styled from "styled-components";

const ALL_VIDEOS_USER = gql`
  query ALL_VIDEOS_USER($id: ID!) {
    videosUser(id: $id) {
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
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  img {
    width: 250px;
    height: 150px;
    align-self: center;
  }
`;

class Videos extends Component {
  state = {
    id: "cjsd65ct8002a0842ykc11w9x"
  };
  render() {
    return (
      <Center>
        <h2>Videos</h2>
        <br />
        <Query query={ALL_VIDEOS_USER} variables={this.state}>
          {({ data, error, loading }) => {
            console.log("data", data);
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
      </Center>
    );
  }
}

export default Videos;

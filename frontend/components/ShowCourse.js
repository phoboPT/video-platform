import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import { element } from "prop-types";
import Video from "./VideoItem";

const VideosList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 4rem;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;

const Center = styled.div`
  text-align: center;
`;

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
      videos {
        id
        video {
          title
          description
          state
          category {
            name
          }
          thumbnail
          createdAt
        }
      }
    }
  }
`;

export class ShowCourse extends Component {
  render() {
    return (
      <>
        <Center>
          <Query query={SINGLE_COURSE_QUERY} variables={{ id: this.props.id }}>
            {({ error, loading, data }) => {
              if (error) return <p>Error!</p>;
              if (loading) return <p>Loading...</p>;
              if (!data.course) return <p>No Course Found</p>;
              return (
                <>
                  <h3>Content of Course {data.course.title} </h3>
                  <VideosList>
                    {data.course.videos.map(videos => (
                      <Video
                        videos={videos}
                        key={videos.id}
                        data={data.course}
                      />
                    ))}
                  </VideosList>
                </>
              );
            }}
          </Query>
        </Center>
      </>
    );
  }
}

export default ShowCourse;

import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import InterestItem from './InterestItem';

const ALL_INTEREST_QUERY = gql`
  query ALL_INTEREST_QUERY {
    interests {
      id
      name
    }
  }
`;

const InterestStyle = styled.div`
  max-width: 1400px;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  button {
    margin: 0px 10px;
  }
`;

const Container = styled.div`
  #message {
    margin: 0;
    padding-top: 2.5rem;
    padding-left: 1.5rem;
    text-align: left;
  }
`;

class CreateCourse extends Component {
  render() {
    return (
      <>
        <Query query={ALL_INTEREST_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error:{error.message}</p>;
            }
            return (
              <>
                <Container>
                  <p id="message">
                    Here you can Select the areas that this course is targeting
                    🎯
                  </p>
                </Container>
                <InterestStyle>
                  {data.interests.map((interest, index) => (
                    <InterestItem
                      key={interest.id}
                      interest={interest}
                      courseId={this.props.courseId}
                      id={index}
                    />
                  ))}
                </InterestStyle>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default CreateCourse;
export { ALL_INTEREST_QUERY };

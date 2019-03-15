import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import Link from "next/link";
import InterestItem from "./InterestsItem";
import styled from "styled-components";
import gql from "graphql-tag";
const Title = styled.p`
  font-size: 46px;
  font-weight: 600;
  line-height: 48px;
  word-spacing: 0px;
  margin: 3rem;
`;
const InterestsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 4rem;
  grid-gap: 60px;
  margin: 3rem;
  max-width: ${props => props.theme.maxWidth};
  button {
    margin: 0px 10px;
  }
`;

const ALL_INTEREST_QUERY = gql`
  query ALL_INTEREST_QUERY {
    interests {
      id
      name
    }
    me {
      id
      email
      name
      permission
      interests {
        id
        interest {
          id
        }
      }
    }
  }
`;

class Interest extends Component {
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
                <Title>Your Interests</Title>
                <InterestsList>
                  {data.interests.map((interest, index) => (
                    <InterestItem
                      key={interest.id}
                      interest={interest}
                      id={index}
                      userInterest={data.me.interests}
                    />
                  ))}
                </InterestsList>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Interest;

export { ALL_INTEREST_QUERY };

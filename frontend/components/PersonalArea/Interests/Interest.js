import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import InterestItem from './InterestsItem';

const Title = styled.p`
  font-size: 35px;
  font-weight: 400;
  line-height: 48px;
  word-spacing: 0px;
  margin: 3rem;
`;
const InterestsList = styled.div`
  display: grid;
  grid-template-columns: ${({ view }) =>
    (view === 0 && '1fr 1fr 1fr') || (view === 1 && '1fr 1fr 1fr 1fr ')};
  padding-top: 1.5rem;
  grid-gap: 60px;
  margin: 1.5rem;
  max-width: ${props => props.theme.maxWidth};
  button {
    margin: 0px 10px;
    border: none;
  }
`;

const ALL_INTEREST_QUERY = gql`
  query ALL_INTEREST_QUERY {
    interests {
      id
      name
      thumbnail
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
  state = {
    view: this.props.view,
  };

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
                {this.state.view === 0 && <Title>Your Interests</Title>}

                <InterestsList view={this.state.view}>
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

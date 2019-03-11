import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InterestItem from "./Create/InterestItem";
import styled from "styled-components";

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
  margin: 40px auto 0 auto;
  background-color: #fff;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  button {
    background-color: #44c767;
    -moz-border-radius: 28px;
    -webkit-border-radius: 28px;
    border-radius: 28px;
    border: 1px solid #18ab29;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 16px 31px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;

    &:hover {
      background-color: #5cbf2a;
    }
    &:active {
      position: relative;
      top: 1px;
    }
  }
`;

class InterestsSelection extends Component {
  render() {
    return (
      <Query query={ALL_INTEREST_QUERY}>
        {({ data, loading, error }) => {
          console.log(data.interests);
          if (loading) return <p>Loading...</p>;

          if (error) return <p>Error:{error.message}</p>;
          if (data.interests) {
            return (
              <>
                <h2>Tags</h2>
                <InterestStyle>
                  {data.interests.map(interest => (
                    <InterestItem interest={interest} key={interest.id} />
                  ))}
                </InterestStyle>
              </>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default InterestsSelection;

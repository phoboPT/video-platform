import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import InterestItem from "./InterestItem";
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
  background-color: #fff;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  button {
    margin: 0px 10px;
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
              <InterestStyle>
                {data.interests.map((interest, index) => (
                  <InterestItem
                    key={interest.id}
                    interest={interest}
                    courseId={this.props.state.courseId}
                    id={index}
                  />
                ))}
              </InterestStyle>
            );
          }}
        </Query>
        <Link href="/">
          <a className="create-course">Finish</a>
        </Link>
      </>
    );
  }
}

export default CreateCourse;
export { ALL_INTEREST_QUERY };

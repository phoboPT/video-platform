import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import InterestItem from './InterestItem';
import Error from '../../../Static/ErrorMessage';

const ALL_INTEREST_QUERY = gql`
  query ALL_INTEREST_QUERY {
    interests {
      id
      name
      thumbnail
    }
  }
`;
const COURSE_QUERY = gql`
  query COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      interest {
        id
        interest {
          id
        }
      }
    }
  }
`;

const InterestStyle = styled.div`
  max-width: 1500px;
  padding: 30px 0px 30px 70px;
  display: flex;
  margin: auto;
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
  state = {
    id: this.props.courseId,
  };

  render() {
    const { id } = this.state;
    return (
      <>
        <Query query={COURSE_QUERY} variables={{ id }}>
          {({ data, error, loading }) => {
            const course = data;
            if (loading) {
              return <p> Loading... </p>;
            }
            if (error) {
              return <p> Error: {error.message} </p>;
            }
            return (
              <Query query={ALL_INTEREST_QUERY}>
                {({ data, error, loading }) => {
                  if (loading) return <Loading />;

                  if (error) return <Error error={error} />;
                  if (!data) return <p>No Data</p>;
                  if (data)
                    return (
                      <>
                        <Container>
                          <p id="message">
                            Here you can Select the areas that this course is
                            targeting 🎯
                          </p>
                        </Container>
                        <InterestStyle>
                          {data.interests.map((interest, index) => (
                            <InterestItem
                              key={interest.id}
                              interest={interest}
                              courseId={this.props.courseId}
                              id={index}
                              courseInterest={course.course.interest}
                            />
                          ))}
                        </InterestStyle>
                      </>
                    );
                }}
              </Query>
            );
          }}
        </Query>
      </>
    );
  }
}

export default CreateCourse;
export { ALL_INTEREST_QUERY, COURSE_QUERY };

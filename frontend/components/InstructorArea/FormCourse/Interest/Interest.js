import gql from 'graphql-tag';
import Link from 'next/link';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InterestItem from './InterestItem';
import Error from '../../../Static/ErrorMessage';
import Loading from '../../../Static/Loading';

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
    const { courseId } = this.props;
    return (
      <>
        <Query query={COURSE_QUERY} variables={{ id }}>
          {({ data, error, loading }) => {
            const course = data;
            if (loading) return <Loading />;

            if (error) return <Error error={error} />;

            return (
              <Query query={ALL_INTEREST_QUERY}>
                {({ data: newData, error: newError, loading: newLoading }) => {
                  if (newLoading) return <Loading />;

                  if (newError) return <Error error={newError} />;
                  if (!newData) return <p>No Data</p>;
                  if (newData)
                    return (
                      <>
                        <Container>
                          <p id="message">
                            Here you can Select the areas that this course is
                            targeting 🎯
                          </p>
                        </Container>
                        <InterestStyle>
                          {newData.interests.map((interest, index) => (
                            <InterestItem
                              key={interest.id}
                              interest={interest}
                              courseId={courseId}
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

CreateCourse.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default CreateCourse;
export { ALL_INTEREST_QUERY, COURSE_QUERY };

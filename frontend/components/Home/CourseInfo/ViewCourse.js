import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import SimpleUser from '../../Authentication/SimpleUser';
import CommentForm from './Comments/CommentForm';
import ListComments from './Comments/ListComments';
import Overview from './Overview';
import Rating from './Comments/Rating';
import Loading from '../../Static/Loading';

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
      totalComments
      totalRate
      user {
        id
        name
        thumbnail
        profession
        description
      }
      videos {
        video {
          id
          title
          file
          createdAt
        }
      }
    }
  }
`;
const CHECK_RATE_COURSE_QUERY = gql`
  query CHECK_RATE_COURSE_QUERY($courseId: ID!) {
    checkUserRated(courseId: $courseId) {
      message
    }
  }
`;

const CourseContainer = styled.div`
  color: white;
  display: flex;
  width: 100%;
  background: #333350;
  padding: 20px 0px;
  h2 {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 1px;
    white-space: nowrap;
    line-height: 33px;
  }
  .info-bar {
    min-height: 50px;
    flex: 2;
    order: 2;
    padding-left: 25px;
  }
  img {
    max-height: 200px;
  }

  a {
    margin-top: 25px;
    margin-left: 20px;
    color: black;
  }

  .video-bar {
    padding-right: 25px;
    text-align: right;
    flex: 1;
    order: 1;
    float: left;
  }
  button {
    width: auto;
    background: red;
    color: white;
    border: 0;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
  }
`;
const Bar = styled.div`
  text-align: center;
  padding: 8px 0px;
  button {
    width: auto;
    background: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid red;
    }

    &:active {
      border-bottom: 3px solid red;
    }
  }
`;

const ButtonStyle = styled.div`
  padding-bottom: 1rem;
  button {
    background: none;
    border: none;
    font-size: 15px;
    line-height: 10px;
    color: #2c2f33;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;

class ViewCourse extends Component {
  state = {
    view: 1,
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  goBack = () => {
    window.history.back();
  };

  render() {
    const { view } = this.state;
    const { id } = this.props;
    return (
      <SimpleUser>
        {({ data: { me } }) => (
          <Query
            query={SINGLE_COURSE_QUERY}
            variables={{ id }}
            notifyOnNetworkStatusChange
          >
            {({ data, error, loading, refetch }) => {
              if (loading) return <Loading />;
              if (error) return <p>Error</p>;

              if (!data.course) {
                return <p>No Courses Found for {id}</p>;
              }
              const { course } = data;
              if (course.id) {
                return (
                  <Query
                    query={CHECK_RATE_COURSE_QUERY}
                    variables={{ courseId: course.id }}
                  >
                    {({ data: newData, error, loading }) => {
                      if (loading) return <Loading />;
                      if (error) return <p>Error</p>;

                      const showForm = newData.checkUserRated.message;
                      if (!newData) return <p>No Course</p>;

                      return (
                        <>
                          <ButtonStyle>
                            <button type="button" onClick={this.goBack}>
                              ⬅ Go Back
                            </button>
                          </ButtonStyle>
                          <CourseContainer>
                            <div className="video-bar">
                              <img alt={course.title} src={course.thumbnail} />
                            </div>
                            <div className="info-bar">
                              <div className="rating">
                                <Rating
                                  showTotal
                                  readOnly
                                  initialValue={
                                    Number.isNaN(course.totalRate)
                                      ? 0
                                      : course.totalRate
                                  }
                                  totalComments={course.totalComments || 0}
                                />
                              </div>
                              <h2>{course.title}</h2>
                              <br />
                            </div>
                          </CourseContainer>
                          <Bar>
                            <button
                              id="1"
                              type="button"
                              onClick={this.changeView}
                            >
                              Overview
                            </button>

                            <button
                              id="3"
                              type="button"
                              onClick={this.changeView}
                            >
                              Review
                            </button>
                          </Bar>
                          {view === 1 && (
                            <Overview
                              view={view}
                              data={course}
                              key={course.id}
                            />
                          )}

                          {view === 3 && (
                            <>
                              {showForm === 'true' && me ? (
                                <CommentForm data={course} refetch={refetch} />
                              ) : (
                                <></>
                              )}

                              <ListComments data={course} refetch={refetch} />
                            </>
                          )}
                        </>
                      );
                    }}
                  </Query>
                );
              }
            }}
          </Query>
        )}
      </SimpleUser>
    );
  }
}

export default ViewCourse;
export { CHECK_RATE_COURSE_QUERY, SINGLE_COURSE_QUERY };

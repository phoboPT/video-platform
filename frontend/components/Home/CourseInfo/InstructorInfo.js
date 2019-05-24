/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import Loading from '../../Static/Loading';
import ItemList from '../../styles/ItemList';
import CourseItem from '../../Courses/CourseItem';
import Error from '../../Static/ErrorMessage';

const STATS_QUERY = gql`
  query STATS_QUERY($id: ID!) {
    instrutorStats(id: $id) {
      cursos
      alunos
      avaliacoes
    }
  }
`;

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      profession
      description
      thumbnail
    }
  }
`;

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY($id: ID!) {
    coursesInstructor(id: $id) {
      id
      title
      price
      thumbnail
      createdAt
      totalRate
      totalComments
      user {
        id
        name
        videoUser {
          videoItem {
            watched
            video {
              id
            }
          }
        }
      }
      videos {
        video {
          id
          title
          urlVideo
          file
          duration
        }
      }
      category {
        id
        name
      }
    }
  }
`;

const Container = styled.div`
  #container-top {
    padding: 1.5rem;
    background: rgba(0, 17, 45, 0.9);
    margin-bottom: 1rem;
    #name {
      margin-left: 2rem;
      line-height: 38px;
      word-spacing: 0px;
      color: white;
    }
    #profession {
      margin-left: 2rem;
      line-height: 28px;
      word-spacing: 0px;
      color: white;
    }
  }
  #container-middle {
    margin-top: 5rem;
    display: flex;

    #left-middle {
      order: 1;
      flex: 1;

      img {
        border-radius: 30%;
        margin-left: auto;
        margin-right: auto;
        display: block;
        height: 350px;
      }

      #stats-container {
        display: flex;
        width: 50%;
        margin: auto;
        text-align: center;
        padding-top: 2rem;
        #alunos {
          border-right: 1px solid black;
          order: 1;
          flex: 1;
        }
        #cursos {
          border-right: 1px solid black;
          order: 2;
          flex: 1;
        }
        #avaliacoes {
          order: 3;
          flex: 1;
        }
      }
    }
    #right-middle {
      border: 1px solid #cccccc;
      order: 2;
      flex: 1;
      #markdown {
        padding: 2rem;
        line-height: 2rem;
      }
    }
  }

  #container-bottom {
    border-radius: 25px;
    margin-top: 7rem;
    padding-bottom: 2rem;
    background: #f4f4f4;
    #title {
      padding: 3rem;
      width: 100%;
      text-align: center;
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
class InstructorInfo extends Component {
  goBack = () => {
    window.history.back();
  };

  render() {
    const { id } = this.props;

    return (
      <Query
        query={SINGLE_USER_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          if (!data.user)
            return <Error error={{ message: ' You should not be Here' }} />;
          return (
            <Query
              query={ALL_COURSES_QUERY}
              variables={{
                id,
              }}
            >
              {({ data: courses, loading: newLoad, error: newError }) => {
                if (newLoad) return <Loading />;
                if (newError) return <Error error={newError} />;

                return (
                  <Query
                    query={STATS_QUERY}
                    variables={{
                      id: data.user.id,
                    }}
                  >
                    {({ data: stats, loading: newLoad1, error: newError1 }) => {
                      if (newLoad1) return <Loading />;
                      if (newError1) return <Error error={newError1} />;
                      return (
                        <>
                          <ButtonStyle>
                            <button type="button" onClick={this.goBack}>
                              ⬅ Go Back
                            </button>
                          </ButtonStyle>
                          <Container>
                            <div id="container-top">
                              <h1 id="name"> {data.user.name} </h1>
                              {data.user.profession !== undefined && (
                                <h3 id="profession">{data.user.profession}</h3>
                              )}
                            </div>
                            <div id="container-middle">
                              <div id="left-middle">
                                <img
                                  alt="thumbnail"
                                  src={data.user.thumbnail}
                                />

                                <div id="stats-container">
                                  <div id="alunos">
                                    <p> Alunos </p>
                                    <p>{stats.instrutorStats.alunos}</p>
                                  </div>
                                  <div id="cursos">
                                    <p> Cursos </p>
                                    <p>{stats.instrutorStats.cursos}</p>
                                  </div>
                                  <div id="avaliacoes">
                                    <p> Avaliaçoes </p>
                                    <p>{stats.instrutorStats.avaliacoes}</p>
                                  </div>
                                </div>
                              </div>
                              <div id="right-middle">
                                <div id="markdown">
                                  <p> About Me: </p>
                                  <Markdown
                                    escapeHtml={false}
                                    source={data.user.description}
                                  />
                                </div>
                              </div>
                            </div>

                            <div id="container-bottom">
                              <p id="title">
                                Courses Taught by {data.user.name}
                              </p>
                              <ItemList>
                                {courses.coursesInstructor.map(course => (
                                  <CourseItem
                                    course={course}
                                    key={course.id}
                                    showInfo
                                  />
                                ))}
                              </ItemList>
                            </div>
                          </Container>
                        </>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

InstructorInfo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default InstructorInfo;

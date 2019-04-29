import Link from 'next/link';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Media from './Media';
import Update from './FormCourse';

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      thumbnail
      state
      createdAt
      section
      videos {
        video {
          id
          title
          file
        }
      }
    }
  }
`;

const CourseContainer = styled.div`
  color: black;
  background: rgba(242, 242, 242, 0.7);

  #form {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .info-container {
    grid-column: 1 / 2;

    label {
      text-align: left;
    }
  }
  .actions-container {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    text-align: center;
    display: grid;
    flex-direction: column;
    input {
      margin: 10px;
    }
    label {
      margin: 40px;
      img {
        margin-top: 10px;
        width: 100%;
        height: 80%;
      }
    }

    #submit {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: none;
      background: #27ad39;
      margin-top: 40px;
      cursor: pointer;
      color: white;
      :focus {
        outline: none;
      }
    }

    #submitLoading {
      border-radius: 5px;
      height: 50px;
      width: 200px;
      text-align: center;
      margin-top: 40px;
      margin: 0 auto;
      font-size: 25px;
      font-weight: 400;
      border: 2px solid #727272;
      background: white;
      color: #727272;
      margin-top: 40px;
      cursor: pointer;
    }
  }

  #courseState {
    padding-top: 10px;
    padding-bottom: 10px;

    button {
      color: #3d3d3d;
      font-size: 17px;
      font-weight: 400;
      border: 1px solid #cccccc;
      background: #f7f7f7;
      cursor: pointer;
      position: relative;
    }
    button:hover {
      outline: none;
      background: #e5e5e5;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }

  img {
    max-height: 200px;
  }

  .description {
    background-color: white;
  }
`;

const Marcador = styled.div`
  margin-top: 4rem;
  button {
    border: 2px solid black;
    border-bottom: 0;
    font-size: 22px;
    font-weight: 400;
    height: 50px;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;
class UpdateCourse extends Component {
  state = {
    view: 1,
    sections: {
      columnOrder: [],
      sections: {},
      videos: {},
      files: {
        cjuxxpdrjlwd50b95l7pksbie: {
          content: '123',
          id: 'cjuxxpdrjlwd50b95l7pksbie',
        },
      },
    },
    hasUpdated: false,
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  updateState = newState => {
    this.setState(prevState => ({
      value: prevState.value + 1,
      sections: { ...newState },
    }));
  };

  render() {
    const { view, sections, hasUpdated } = this.state;
    const { id } = this.props;
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading</p>;
          if (!data.course) return <p>No Courses Found for {id}</p>;
          if (!hasUpdated && data.course) {
            const newSection = JSON.parse(data.course.section);
            console.log(newSection);
            this.setState({ sections: newSection });
            this.setState({ hasUpdated: true });
          }
          return (
            <>
              <Link href="/courses">
                <a>⬅ Go Back</a>
              </Link>
              <Marcador>
                <button type="button" id="1" onClick={this.changeView}>
                  Info
                </button>
                <button type="button" id="2" onClick={this.changeView}>
                  Media
                </button>
              </Marcador>
              <CourseContainer>
                {view === 1 && (
                  <Update id={id} course={data.course} section={sections}>
                    <button
                      id={loading ? 'submitLoading' : 'submit'}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </Update>
                )}
                {view === 2 && (
                  <Media
                    sections={sections}
                    updateState={this.updateState}
                    courseId={id}
                  >
                    <button
                      id={loading ? 'submitLoading' : 'submit'}
                      type="submit"
                      disabled={loading}
                      className="save"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </Media>
                )}
              </CourseContainer>
            </>
          );
        }}
      </Query>
    );
  }
}

UpdateCourse.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateCourse;

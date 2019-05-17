import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Media from './Media';
import FormCourse from './FormCourse';
import Interest from './Interest/Interest';
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
      section
      price
      category {
        id
        name
      }
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
    padding-right: 1.5rem;
    grid-column: 1 / 2;

    label {
      color: #353535;

      text-align: left;
    }
  }
  .actions-container {
    border-left: 1px solid #cccccc;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    text-align: center;
    display: grid;
    flex-direction: column;
    input {
      margin: 10px;
    }
    label {
      color: #353535;

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
      margin: 0 auto 15 auto;
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
    background: white;
    margin-right: 3px;
  }
  button:hover {
    background: #d1d1d1;
  }
  button:focus {
    outline: none;
  }
  button:disabled {
    cursor: not-allowed;
    background: white;
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

class ChangeCourse extends Component {
  state = {
    selected: 1,
    createCourse: this.props.createCourse,
    view: 1,
    id: this.props.id,
    sections: {
      columnOrder: [],
      sections: {},
      videos: {},
      files: {
        // cjuxxpdrjlwd50b95l7pksbie: {
        //   content: '123',
        //   id: 'cjuxxpdrjlwd50b95l7pksbie',
        // },
      },
    },
    hasUpdated: false,
    key: 0,
  };

  changeView = e => {
    this.setState({
      view: parseInt(e.target.id),
      selected: parseInt(e.target.id),
    });
  };

  updateState = newState => {
    this.setState(prevState => ({
      value: prevState.value + 1,
      sections: { ...newState },
    }));
  };

  goBack = () => {
    window.history.back();
  };

  changeToEdit = res => {
    this.setState({
      createCourse: false,
      id: res.data.saveCourse.id,
    });
  };

  applyInitialSection = () => {
    const { initialSection, key } = this.state;
    const newState = JSON.parse(JSON.stringify(initialSection));
    this.setState({ sections: newState, key: key + 1 });
  };

  render() {
    const {
      id,
      view,
      sections,
      hasUpdated,
      createCourse,
      selected,
      key,
      updateFilesToDelete,
    } = this.state;
    const { changeIntructorView } = this.props;
    return (
      <Query query={SINGLE_COURSE_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!createCourse) {
            if (!data.course) return <p>No Courses Found for {id}</p>;
            if (!hasUpdated && data.course) {
              if (data.course.section) {
                const newSection = JSON.parse(data.course.section);
                const section = JSON.parse(data.course.section);
                this.setState({ hasUpdated: true, sections: newSection });
                this.setState({
                  initialSection: section,
                });
              }
            }
          }
          return (
            <>
              <ButtonStyle>
                {!changeIntructorView ? (
                  <button type="button" onClick={this.goBack}>
                    ⬅Go Back
                  </button>
                ) : (
                  <button type="button" onClick={() => changeIntructorView(1)}>
                    <a> ⬅Go Back </a>
                  </button>
                )}
              </ButtonStyle>
              <Marcador>
                <button
                  type="button"
                  id="1"
                  disabled={selected === 1}
                  onClick={this.changeView}
                >
                  Info ℹ️
                </button>
                {!createCourse && (
                  <>
                    <button
                      type="button"
                      id="2"
                      disabled={selected === 2}
                      onClick={this.changeView}
                    >
                      Media 🎞️
                    </button>
                    <button
                      type="button"
                      id="3"
                      disabled={selected === 3}
                      onClick={this.changeView}
                    >
                      Target 🎯
                    </button>
                  </>
                )}
              </Marcador>
              <CourseContainer>
                {view === 1 &&
                  (createCourse ? (
                    <FormCourse createCourse changeToEdit={this.changeToEdit} />
                  ) : (
                    <FormCourse
                      id={id}
                      course={data.course}
                      section={sections}
                    />
                  ))}
                {view === 2 && (
                  <Media
                    updateFilesToDelete={this.updateFilesToDelete}
                    key={key}
                    sections={sections}
                    updateState={this.updateState}
                    courseId={id}
                    undoSections={this.applyInitialSection}
                  />
                )}
                {view === 3 && <Interest courseId={id} />}
              </CourseContainer>
            </>
          );
        }}
      </Query>
    );
  }
}

ChangeCourse.propTypes = {
  id: PropTypes.string.isRequired,
  changeIntructorView: PropTypes.func,
};

export default ChangeCourse;
export { SINGLE_COURSE_QUERY };

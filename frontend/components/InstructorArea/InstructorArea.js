import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';
import ChangeCourse from './FormCourse/ChangeCourse';
import MyCourses from './MyCourses';

const Style = styled.div`
  .container {
    display: flex;
  }

  .top-bar {
    margin: 0 auto;
    width: 60%;
    min-height: 50px;
    background: #d8d8d8;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
  }

  .main-bar {
    order: 2;
    flex: 7;
    padding-top: 30px;
    float: bottom;
    .create-course {
      width: auto;
      background: red;
      color: white;
      border: 0;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
      text-align: center;
    }
  }
  .left-bar {
    order: 1;
    flex: 1;
    border-right: 1px solid black;
    #ButtonAdd {
      width: 90%;
      padding-top: 4rem;
    }
  }
`;
const AddButon = styled.div`
  padding-bottom: 25px;

  button {
    border: none !important;
    background: none;
    text-align: right;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }

  span {
    font-size: 3rem;
  }
`;

class Courses extends Component {
  state = {
    view: 1,
  };

  // This method will be sent to the child component
  saveToState = e => {
    this.setState({ courseId: e.data.createCourse.id, view: 3 });
  };

  changeView = id => {
    this.setState({ view: id });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return <p>No Courses</p>;
          return (
            <>
              {me.permission[0] === 'INSTRUTOR' ? (
                <Style>
                  <section id="main" className="top-bar">
                    <h2> Manage Courses </h2>
                  </section>

                  <div className="container">
                    {this.state.view !== 2 && (
                      <div className="left-bar">
                        <AddButon>
                          <button
                            type="button"
                            id="ButtonAdd"
                            onClick={() => {
                              this.changeView(2);
                            }}
                          >
                            <img
                              src="../../../static/addButton.png"
                              alt="Add"
                              width="48"
                              height="48"
                            />
                          </button>
                        </AddButon>
                      </div>
                    )}

                    <aside id="sidebar" className="main-bar">
                      {this.state.view === 1 && (
                        <MyCourses changeView={this.changeView} />
                      )}
                      {this.state.view === 2 && (
                        <ChangeCourse
                          changeIntructorView={this.changeView}
                          createCourse
                          saveToState={this.saveToState}
                        />
                      )}
                    </aside>
                  </div>
                </Style>
              ) : (
                <p>You don't have permission to be here!</p>
              )}
            </>
          );
        }}
      </User>
    );
  }
}

export default Courses;

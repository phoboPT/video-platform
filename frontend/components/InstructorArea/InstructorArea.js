import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';
import ChangeCourse from './FormCourse/ChangeCourse';
import MyCourses from './MyCourses';
import StatsPage from './StatsPage';

const Style = styled.div`
  .container {
    display: flex;
  }

  .main-bar {
    order: 2;
    flex: 7;
    float: bottom;
    margin: 0 0 0 5rem;

    .top-bar {
      margin-bottom: 2rem;
      color: black;
      font-family: 'Quicksand', sans-serif;
      width: 100%;
      font-size: 27px;
      text-align: center;
    }
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

class InstrutorArea extends Component {
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
    const { view, courseId } = this.state;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return <p>No Courses</p>;
          return (
            <>
              {me.permission[0] === 'INSTRUTOR' ? (
                <Style>
                  <div className="container">
                    <div className="left-bar">
                      <AddButon>
                        <button
                          type="button"
                          id="ButtonAdd"
                          onClick={() => {
                            this.changeView(1);
                          }}
                        >
                          <img
                            src="../../../static/home.webp"
                            alt="Add"
                            width="48"
                            height="48"
                          />
                        </button>
                        <button
                          type="button"
                          id="ButtonAdd"
                          className="Add"
                          onClick={() => {
                            this.changeView(2);
                          }}
                        >
                          <img
                            src="../../../static/addButton.webp"
                            alt="Add"
                            width="48"
                            height="48"
                          />
                        </button>
                        <button
                          type="button"
                          id="ButtonAdd"
                          onClick={() => {
                            this.changeView(3);
                          }}
                        >
                          <img
                            src="../../../static/graph.webp"
                            alt="Stats"
                            width="48"
                            height="48"
                          />
                        </button>
                      </AddButon>
                    </div>

                    <aside id="sidebar" className="main-bar">
                      <section id="main" className="top-bar">
                        {view === 1 && <h2> Manage Courses </h2>}
                        {view === 2 && <h2> Create Course </h2>}
                        {view === 3 && <h2> Statistics </h2>}
                      </section>
                      {view === 1 && (
                        <>
                          <MyCourses changeView={this.changeView} />
                        </>
                      )}
                      {view === 2 && (
                        <ChangeCourse
                          createCourse
                          saveToState={this.saveToState}
                        />
                      )}
                      {view === 3 && (
                        <StatsPage key={view} courses={me.courses} />
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

export default InstrutorArea;

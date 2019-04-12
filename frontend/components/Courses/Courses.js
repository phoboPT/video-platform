import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../Authentication/User';
import LinkStyle from '../styles/LinkStyle';
import CreateCourse from './CreateCourse/CreateCourse';
import FormCourse from './CreateCourse/FormCourse';
import MyCourses from './MyCourses/MyCourses';
import UserCourses from './MyCourses/UserCourses';
import CreateVideo from './UploadVideo/CreateVideo';

const Button = styled.button`
  width: auto !important;
  background: red !important;
  color: white !important;
  border: 0 !important;
  font-size: 2rem !important;
  font-weight: 600 !important;
  padding: 0.5rem 1.2rem !important;
  text-align: center !important;
`;

const Style = styled.div`
  .container {
    display: columuns;
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
    padding-top: 30px;
    float: bottom;
    text-align: center;
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
              {me.permission[0] === 'INSTRUTOR' && (
                <Style>
                  <div className="container">
                    <section id="main" className="top-bar">
                      <h2>My Courses</h2>

                      {/* <button id="4" onClick={this.changeView}>
                        Upload Video
                      </button> */}
                    </section>

                    <aside id="sidebar" className="main-bar">
                      {this.state.view === 1 && (
                        <MyCourses changeView={this.changeView} />
                      )}
                      {this.state.view === 2 && (
                        <FormCourse
                          changeView={this.changeView}
                          saveToState={this.saveToState}
                        />
                      )}
                      {this.state.view === 3 && (
                        <CreateCourse courseId={this.state.courseId} />
                      )}
                      {this.state.view === 4 && <CreateVideo />}
                    </aside>
                  </div>
                </Style>
              )}
              {me.permission[0] === 'USER' && (
                <LinkStyle>
                  <div className="grid-container">
                    <div className="left">
                      <UserCourses />
                    </div>
                    <div className="right">
                      <MyCourses />
                    </div>
                  </div>
                </LinkStyle>
              )}
            </>
          );
        }}
      </User>
    );
  }
}

export default Courses;

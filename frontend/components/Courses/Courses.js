import React, { Component } from 'react';
import LinkStyle from '../styles/LinkStyle';
import UserCourses from './UserCourses';

class Courses extends Component {
  render() {
    return (
      <LinkStyle>
        <div className="grid-container">
          <div className="left">
            <UserCourses />
          </div>
        </div>
      </LinkStyle>
    );
  }
}

export default Courses;

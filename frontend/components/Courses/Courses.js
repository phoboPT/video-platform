import React, { Component } from 'react';
import LinkStyle from '../styles/LinkStyle';
import UserCourses from './UserCourses';

class Courses extends Component {
  render() {
    const { query } = this.props;
    return (
      <LinkStyle>
        <div className="grid-container">
          <div className="left">
            <UserCourses query={query} />
          </div>
        </div>
      </LinkStyle>
    );
  }
}

export default Courses;

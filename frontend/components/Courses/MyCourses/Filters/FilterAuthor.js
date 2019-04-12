import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../../../Authentication/User';
import reduceData from '../../../../lib/reduceData';

const Style = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  p {
    color: #303030;
    font-size: 15px;
    font-weight: 100 !important;
    word-spacing: 2px;
  }
  select {
    font-size: 2.2rem;
    color: #212121;
    font-weight: 300;
    border-radius: 1.5;
    background: #c6b5b4;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;
export class FilterAuthor extends Component {
  state = {
    authorId: this.props.state,
  };

  handleChange = e => {
    this.setState({ authorId: e.target.value });
    this.props.changeAuthor(e.target.value);
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) {
            return null;
          }
          // filtering results to remove categorys with the same id
          const courses = me.courses.map(course => course.course.user);
          const resFinal = reduceData(courses);
          return (
            <Style>
              <select id="author" defaultValue="a" onChange={this.handleChange}>
                <option value="a" disabled hidden>
                  Author
                </option>
                {resFinal.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </Style>
          );
        }}
      </User>
    );
  }
}

export default FilterAuthor;

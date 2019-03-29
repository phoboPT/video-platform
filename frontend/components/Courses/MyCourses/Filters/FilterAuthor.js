import React, { Component } from "react";
import User from "../../../Authentication/User";
import styled from "styled-components";

const Style = styled.div`
  margin: 5rem;
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
    authorId: this.props.state
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

          return (
            <Style>
              <select id="author" onChange={this.handleChange}>
                <option value="a" selected disabled hidden>
                  Author
                </option>
                {me.courses.map(course => (
                  <option
                    key={course.course.user.id}
                    value={course.course.user.id}
                  >
                    {course.course.user.name}
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

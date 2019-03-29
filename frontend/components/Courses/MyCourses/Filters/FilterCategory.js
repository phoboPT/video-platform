import React, { Component } from "react";
import User from "../../../Authentication/User";
import styled from "styled-components";

const Style = styled.div`
  margin-left: 5rem;
  margin-top: 2rem;

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
export class FilterCategory extends Component {
  state = {
    categoryId: this.props.state
  };

  handleChange = e => {
    this.setState({ categoryId: e.target.value });
    this.props.changeCategory(e.target.value);
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
              <select id="category" onChange={this.handleChange}>
                <option value="a" selected disabled hidden>
                  Categories
                </option>
                {me.courses.map(course => (
                  <option
                    key={course.course.category.id}
                    value={course.course.category.id}
                  >
                    {course.course.category.name}
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

export default FilterCategory;

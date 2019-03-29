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
              <p>Filtrar Por</p>
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

import React, { Component } from 'react';
import styled from 'styled-components';
import User from '../../Authentication/User';
import reduceData from '../../../lib/reduceData';

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

class FilterCategory extends Component {
  state = {
    categoryId: this.props.state,
  };

  handleChange = e => {
    const { changeCategory } = this.props;
    this.setState({ categoryId: e.target.value });
    changeCategory(e.target.value);
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) {
            return null;
          }
          // filtering results to remove categorys with the same id
          const courses = me.courses.map(course => course.course.category);
          const resFinal = reduceData(courses);
          return (
            <Style>
              <select
                id="category"
                defaultValue="a"
                onChange={this.handleChange}
              >
                <option value="a" disabled hidden>
                  Categories
                </option>

                {resFinal.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
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

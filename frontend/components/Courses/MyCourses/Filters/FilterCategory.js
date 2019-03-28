import React, { Component } from "react";
import User from "../../../Authentication/User";
export class FilterCategory extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <div>
              <select id="ddl">
                <option value="">Categories</option>
                {me.courses.map(course => (
                  <option
                    key={course.course.category.id}
                    value={course.course.category.id}
                  >
                    {course.course.category.name}
                  </option>
                ))}
                {console.log(me)}
              </select>
            </div>
          );
        }}
      </User>
    );
  }
}

// <select
// id="dropdownlist"
// onChange={this.handleChange}
// name="category"
// >
// {data.categories.map(category => (
//   <option key={category.id} value={category.id}>
//     {category.name}
//   </option>
// ))}
// </select>

// const ALL_CATEGORIES_QUERY = gql`
//   query ALL_CATEGORIES_QUERY {
//     categories {
//       name
//       id
//     }
//   }
// `;
export default FilterCategory;

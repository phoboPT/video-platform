import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import orderCourse from '../../../lib/orderCourses';
import ItemList from '../../styles/ItemList';
import CourseItem from './CourseItem';
import FilterAuthor from './Filters/FilterAuthor';
import FilterCategory from './Filters/FilterCategory';
import Wishlist from './Wishlist';

const COURSES_FILTER_QUERY = gql`
  query COURSES_FILTER_QUERY($category: ID, $author: ID) {
    coursesFilter(category: $category, author: $author) {
      course {
        id
        title
        thumbnail
        state
        createdAt
        category {
          id
          name
        }
      }
    }
  }
`;

const Bar = styled.div`
  text-align: center;
  padding: 8px 0px;
  background: #333350;
  button {
    width: auto;
    color: white;
    background: none;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid red;
    }

    &:active {
      border-bottom: 3px solid red;
    }
  }
`;
const Container = styled.div`
  .reset {
    color: #515151;
    font-size: 12px;
    font-weight: 100;
    margin-top: 3rem;
    margin-left: 3.5rem;
    &:hover {
      cursor: pointer;
      color: #2d2d2d;
    }
    &:focus {
      outline: none;
    }
    &:disabled {
      color: #d1d1d1;
      cursor: not-allowed;
    }
  }
  #flex {
    display: flex !important;
  }
  .filter {
    color: #303030;
    font-size: 15px;
    font-weight: 100 !important;
    word-spacing: 2px;
    margin-left: 5rem;
    margin-top: 3rem;
    margin-bottom: 0;
  }
`;

class UserCourses extends Component {
  state = {
    author: 'a',
    category: 'a',
    isDisabled: true,
    view: 1,
  };

  changeView = e => {
    this.setState({ view: parseInt(e.target.id) });
  };

  changeCategory = categoryId => {
    this.setState({ category: categoryId, isDisabled: false });
  };

  changeAuthor = authorId => {
    this.setState({ author: authorId, isDisabled: false });
  };

  reset = e => {
    const selectBoxcategory = document.getElementById('category');
    selectBoxcategory.value = 'a';

    const selectBoxauthor = document.getElementById('author');
    selectBoxauthor.value = 'a';
    this.setState({ author: 'a', category: 'a', isDisabled: true });
  };

  render() {
    return (
      <Query
        query={COURSES_FILTER_QUERY}
        variables={{ category: this.state.category, author: this.state.author }}
      >
        {({ data, loading }) => {
          if (data) {
            const courses = orderCourse(data.coursesFilter);

            return (
              <>
                <Bar>
                  <div className="info-bar">
                    <button id={1} onClick={this.changeView}>
                      My Courses
                    </button>
                    <button id={2} onClick={this.changeView}>
                      Whish List
                    </button>
                  </div>
                </Bar>
                {data.coursesFilter.length === 0 &&
                  (this.state.view === 1 && <p>No Courses Found </p>)}
                {data.coursesFilter.length > 0 &&
                  (this.state.view === 1 && (
                    <Container>
                      <p className="filter">Filtrar Por</p>
                      <div id="flex">
                        <FilterCategory
                          changeCategory={this.changeCategory}
                          state="a"
                        />
                        <FilterAuthor
                          changeAuthor={this.changeAuthor}
                          state="a"
                        />
                        <button
                          type="button"
                          disabled={this.state.isDisabled}
                          className="reset"
                          onClick={this.reset}
                        >
                          Reset
                        </button>
                      </div>
                      <ItemList>
                        {courses.map(course => (
                          <CourseItem
                            course={course.course}
                            key={course.course.id}
                            update={false}
                          />
                        ))}
                      </ItemList>
                    </Container>
                  ))}
                {this.state.view === 2 && (
                  <>
                    <Wishlist />
                  </>
                )}
              </>
            );
          }
        }}
      </Query>
    );
  }
}

export default UserCourses;

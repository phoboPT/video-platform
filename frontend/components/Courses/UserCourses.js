import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import orderCourse from '../../lib/orderCourses';
import ItemList from '../styles/ItemList';
import CourseItem from './CourseItem';
import FilterAuthor from './Filters/FilterAuthor';
import FilterCategory from './Filters/FilterCategory';
import Wishlist from './Wishlist';
import Loading from '../Static/Loading';

const COURSES_FILTER_QUERY = gql`
  query COURSES_FILTER_QUERY($category: ID, $author: ID) {
    coursesFilter(category: $category, author: $author) {
      course {
        id
        title
        thumbnail
        state
        createdAt
        videos {
          video {
            id
          }
        }
        category {
          id
          name
        }
        user {
          id
          name
        }
      }
      user {
        id
        name
        videoUser {
          id
          videoItem {
            id
            watched
            video {
              id
            }
          }
        }
      }
    }
  }
`;

const Bar = styled.div`
  .active {
    border-bottom: 3px solid red;
  }
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
    /* &:hover {
      border-bottom: 3px solid red;
    } */

    &:focus {
      outline: none;
    }
  }
`;
const Container = styled.div`
  @keyframes yourAnimation {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .animation {
    animation: yourAnimation 8s forwards 0s linear;
  }

  .success {
    display: flex;
    .icon {
      border-radius: 0 0 0 8px;
      background-color: rgba(77, 187, 79, 0.66);
      order: 1;
      flex: 0.4;
      border: 1px solid rgba(77, 187, 79, 0.66);
      text-align: center;

      p {
        margin: none;
      }
    }
    .message {
      border-radius: 0 0 8px 0;
      border: 1px solid rgba(77, 187, 79, 0.66);
      order: 2;
      flex: 10;
      h3 {
        padding: 0 3rem;
      }
    }
  }
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
    margin-top: COURSES_FILTER_QUERY3rem;
    margin-bottom: 0;
  }
`;

class UserCourses extends Component {
  state = {
    author: 'a',
    category: 'a',
    isDisabled: true,
    view: 1,
    showMessage: this.props.query.afterBuyed === 'true',
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

  reset = () => {
    const selectBoxcategory = document.getElementById('category');
    selectBoxcategory.value = 'a';

    const selectBoxauthor = document.getElementById('author');
    selectBoxauthor.value = 'a';
    this.setState({ author: 'a', category: 'a', isDisabled: true });
  };

  async componentDidMount() {
    const { showMessage } = this.state;
    if (showMessage) {
      setTimeout(async () => {
        await this.setState({ showMessage: !showMessage });
      }, 8000);
    }
  }

  render() {
    const { category, author, view, isDisabled, showMessage } = this.state;

    return (
      <Query query={COURSES_FILTER_QUERY} variables={{ category, author }}>
        {({ data, loading }) => {
          if (!data) return <p>No Courses</p>;

          if (data) {
            const courses = orderCourse(data.coursesFilter);
            return (
              <>
                <Bar>
                  <div className="info-bar">
                    <button
                      type="button"
                      id={1}
                      onClick={this.changeView}
                      className={view === 1 ? 'active' : ''}
                    >
                      My Courses
                    </button>
                    <button
                      type="button"
                      id={2}
                      onClick={this.changeView}
                      className={view === 2 ? 'active' : ''}
                    >
                      Whish List
                    </button>
                  </div>
                </Bar>
                {data.coursesFilter.length === 0 &&
                  (view === 1 && <p>No Courses Found </p>)}
                {data.coursesFilter.length > 0 &&
                  (view === 1 && (
                    <>
                      <Container>
                        {showMessage && (
                          <div className="success animation">
                            <div className="icon">
                              <p> ✅</p>
                            </div>
                            <div className="message">
                              <h3>
                                Congratulations for buying a course. Have a nice
                                learning
                              </h3>
                            </div>
                          </div>
                        )}
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
                            disabled={isDisabled}
                            className="reset"
                            onClick={this.reset}
                          >
                            Reset
                          </button>
                        </div>

                        <ItemList>
                          {courses.map(course => (
                            <CourseItem
                              course={course}
                              key={course.course.id}
                            />
                          ))}
                        </ItemList>
                      </Container>
                    </>
                  ))}
                {view === 2 && (
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
export { COURSES_FILTER_QUERY };
